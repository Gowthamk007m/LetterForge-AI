from django.shortcuts import render
from weasyprint import HTML,CSS

# Create your views here.
def home(request):
    html = HTML('template/cover-letter-template-modern.html')
    
    # Define CSS with A4 size and ensure content fits
    css = CSS(string='''
        @page {
            size: A4;
            margin: 1cm;
        }
        body {
            font-size: 14px;
            line-height: 1.5;
            word-wrap: break-word;
        }
    ''')
    
    # Generate the PDF
    pdf_file_path = 'template/weasyprint-website.pdf'
    html.write_pdf(pdf_file_path, stylesheets=[css])
    return render(request, 'cover-letter-template-modern.html')


