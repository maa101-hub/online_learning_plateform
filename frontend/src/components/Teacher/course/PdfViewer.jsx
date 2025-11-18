const PdfViewer = ({ url }) => {
  const gview = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(url)}`;
  
  return (
    <div className="w-full h-[600px] rounded-xl overflow-hidden shadow-lg border border-gray-200">
      <iframe
        src={gview}
        className="w-full h-full"
        frameBorder="0"
        title="PDF Viewer"
      />
    </div>
  );
};


export default PdfViewer;
