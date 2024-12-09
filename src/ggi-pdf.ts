import puppeteer from 'puppeteer'
import hb from 'handlebars'
import { jsPDF } from 'jspdf'

export const genGGIPdf = async (html: string, password: string, name: string, pageNum: number) => {
  try {
    const contentWrapperStart = `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Gowun+Batang&display=swap" rel="stylesheet">
      </head>
      <script src="https://cdn.tailwindcss.com"></script>
      <script>
        tailwind.config = {
          content: [
            './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
            './src/components/**/*.{js,ts,jsx,tsx,mdx}',
            './src/app/**/*.{js,ts,jsx,tsx,mdx}',
          ],
          theme: {
            extend: {
              fontFamily: {
                nanum: ['NanumGothic', 'sans-serif'],
                batang: ['Batang', 'serif'],
              },
              backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                  'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
              },
            },
            colors: {
              // ... 기존 colors 설정
            }
          },
          plugins: [require("tailwind-scrollbar-hide")],
        }
      </script>
      <body>
        <div class="flex flex-col bg-white h-[100%] w-[100%] mx-auto relative justify-center items-center">
    `
    const contentWrapperEnd = `</div></body></html>`;

    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();

    const template = hb.compile(
      contentWrapperStart + html + contentWrapperEnd,
      { strict: true }
    );
    const result = template({});

    await page.setContent(result);
    await page.setViewport({ width: 1000, height: 1300 })

    const imgData = await page.screenshot({ 
      fullPage: true,
      encoding: 'base64'
    });

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      encryption: {
        userPassword: password,
        ownerPassword: password,
        userPermissions: ['print', 'modify', 'copy', 'annot-forms'],
      },
      compress: true,
    });

    const imgWidth = 210
    const pageHeight = 297
    const imgHeight = pageHeight * pageNum
    let heightLeft = imgHeight
    let position = 0

    doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight

    while (heightLeft >= 20) {
      position = heightLeft - imgHeight + 10
      doc.addPage()
      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
    };

    const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
    await browser.close();
    
    const sanitizedFileName = name.replace(/[^\w\s.-]/g, '') + '.pdf'

    return {
      pdfBuffer,
      sanitizedFileName
    }
  } catch (error) {
    console.error(error)
    throw new Error('Failed to generate PDF')
  }
}