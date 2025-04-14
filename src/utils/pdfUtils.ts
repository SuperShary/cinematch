
import { Movie } from '@/components/MovieCard';
import { jsPDF } from 'jspdf';

export const createPdf = async (movies: Movie[], userName: string, genre: string) => {
  try {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.setTextColor(220, 38, 38); // Red color (Netflix theme)
    doc.text(`Movie Recommendations for ${userName}`, 20, 20);
    doc.setFontSize(16);
    doc.text(`Genre: ${genre}`, 20, 30);
    
    doc.setTextColor(0, 0, 0); // Reset to black
    doc.setFontSize(12);
    
    let yPosition = 40;
    
    movies.forEach((movie, index) => {
      // Check if we need a new page
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }
      
      const movieNumber = index + 1;
      
      // Title and year
      doc.setFontSize(14);
      doc.setFont(undefined, 'bold');
      doc.text(`${movieNumber}. ${movie.title} (${movie.year}) - ${movie.rating}`, 20, yPosition);
      yPosition += 7;
      
      // Platforms
      if (movie.platforms && movie.platforms.length > 0) {
        doc.setFontSize(10);
        doc.setFont(undefined, 'italic');
        doc.text(`Available on: ${movie.platforms.join(', ')}`, 20, yPosition);
        yPosition += 5;
      }
      
      // Description
      doc.setFontSize(12);
      doc.setFont(undefined, 'normal');
      
      // Handle long descriptions with text wrapping
      const descriptionLines = doc.splitTextToSize(movie.description, 170);
      doc.text(descriptionLines, 20, yPosition);
      yPosition += descriptionLines.length * 6;
      
      // Why user might like it
      doc.setFont(undefined, 'italic');
      const whyLikeLines = doc.splitTextToSize(`Why you might like it: ${movie.whyUserMightLikeIt}`, 170);
      doc.text(whyLikeLines, 20, yPosition);
      yPosition += whyLikeLines.length * 6 + 10;
    });
    
    // Save the PDF
    doc.save(`${userName}-${genre}-movie-recommendations.pdf`);
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};
