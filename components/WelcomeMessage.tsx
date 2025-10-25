
import React from 'react';

export const WelcomeMessage: React.FC = () => {
  return (
    <div className="text-center p-8 bg-gray-800/30 border-2 border-dashed border-gray-700 rounded-xl animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-200">Welcome to Your Career Future</h2>
      <p className="mt-2 text-gray-400 max-w-xl mx-auto">
        Enter your job title, field, or a skill you're passionate about in the search bar above.
        Our AI will provide a detailed analysis of how technology is shaping its future and give you a roadmap to stay ahead.
      </p>
    </div>
  );
};

// Add fade-in animation to tailwind config or a style tag if needed.
// For simplicity, we can add it in index.html, but here's the CSS:
/*
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}
*/
// We can use tailwind's animation support directly if configured.
// For this single-file project, let's just make it a class that can be used.
// Let's add the keyframes to the index.html head style tag
const style = document.createElement('style');
style.innerHTML = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}
`;
document.head.appendChild(style);
