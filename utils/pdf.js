const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs');


async function generatePCBuildPDF(buildData, imagesPath) {
    return new Promise((resolve, reject) => {
        try {
            const doc = new PDFDocument({
                margin: 50,
                size: 'A4'
            });

            // Collect PDF chunks
            const chunks = [];
            doc.on('data', chunk => chunks.push(chunk));
            doc.on('end', () => resolve(Buffer.concat(chunks)));

            function formatKey(key) {
                return key
                    .replace(/_/g, ' ')
                    .replace(/([A-Z])/g, ' $1')
                    .replace(/^./, str => str.toUpperCase())
                    .trim();
            }

            function formatValue(value, key) {
                if (Array.isArray(value)) {
                    return value.join(' - ');
                } else if (typeof value === 'boolean') {
                    return value ? 'Yes' : 'No';
                } else if (typeof value === 'number') {
                    if (key.includes('price')) {
                        return `$${value.toFixed(2)}`;
                    }
                    return value.toString();
                }
                return value;
            }

            // Document title
            doc.font('Times-Bold')
                .fontSize(24)
                .text('PC Build Specifications', {
                    align: 'center'
                });

            // Add generation date
            doc.font('Times-Roman')
                .fontSize(10)
                .text(`Generated on ${new Date().toLocaleDateString()}`, {
                    align: 'center'
                })
                .moveDown(2);

            // Helper function to add a section with image
            async function addComponentSection(title, data, imageName) {
                // Check if we need a new page
                if (doc.y > 650) {
                    doc.addPage();
                }

                const startY = doc.y;
                const imageX = 50;
                const imageWidth = 100;
                const imageHeight = 100;
                const specX = imageX + imageWidth + 20;
                const maxSpecWidth = 500 - specX;

                doc.font('Times-Bold')
                    .fontSize(16)
                    .text(title, imageX, startY);

                try {
                    const imagePath = path.join(imagesPath, `${imageName}.png`);
                    if (fs.existsSync(imagePath)) {
                        doc.image(imagePath, imageX, startY + 20, {
                            width: imageWidth,
                            height: imageHeight,
                            align: 'left'
                        });
                    }
                } catch (error) {
                    console.error(`Error loading image for ${title}:`, error);
                }

                // Add specifications
                doc.font('Times-Roman')
                    .fontSize(12);

                let specY = startY + 30;
                Object.entries(data).forEach(([key, value]) => {
                    const formattedKey = formatKey(key);
                    const formattedValue = formatValue(value, key);

                    // Check if we need a new page
                    if (specY > 750) {
                        doc.addPage();
                        specY = 50;
                    }

                    doc.text(`${formattedKey}: ${formattedValue}`,
                        specX,
                        specY,
                        {
                            continued: false,
                            width: maxSpecWidth
                        }
                    );

                    specY += 20;
                });

                doc.y = Math.max(doc.y, startY + imageHeight + 40);
                doc.moveDown(1);
            }

            const sections = [
                { title: 'CPU', data: buildData.cpu, image: 'cpu' },
                { title: 'GPU', data: buildData.gpu, image: 'gpu' },
                { title: 'RAM', data: buildData.ram, image: 'ram' },
                { title: 'Motherboard', data: buildData.motherboard, image: 'motherboard' },
                { title: 'Power Supply', data: buildData.powerSupply, image: 'psu' },
                { title: 'Storage', data: buildData.storage, image: 'storage' },
                { title: 'Case', data: buildData.pcCase, image: 'case' },
                { title: 'Cooler', data: buildData.cooler, image: 'cooler' }
            ];

            sections.forEach(section => {
                addComponentSection(section.title, section.data, section.image);
            });

            // Add total price

            // Add footer with page numbers
            const totalPages = doc.bufferedPageRange().count;
            for (let i = 1; i < totalPages; i++) {
                doc.switchToPage(i);
                doc.font('Times-Roman')
                    .fontSize(10)
                    .text(
                        `Page ${i + 1} of ${totalPages}`,
                        0,
                        doc.page.height - 50,
                        { align: 'center' }
                    );
            }

            doc.end();

        } catch (error) {
            reject(error);
        }
    });
}
module.exports = {generatePCBuildPDF}