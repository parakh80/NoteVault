import React from 'react';

function About() {
  const boldFirstCharacter = (text) => {
    return text.split(' ').map((word, index) => {
      return (
        <span key={index}>
          <strong>{word.slice(0, 2)}</strong>
          {word.slice(2)}{' '}
        </span>
      );
    });
  };
  const paragraphText1 = `
  Your personal note-taking haven! At NoteVault, users can effortlessly organize their thoughts by logging in or signing up to create and manage their notes. Once logged in, users can craft detailed notes comprising a title, description, and tags, complemented by a convenient submit button. As each note is submitted, it seamlessly appears below, showcasing users' thoughts and ideas.
  `;

  const paragraphText2 =`Additionally, leveraging the power of GPT-3.5, NoteVault enriches user experiences by providing insightful analyses. Users can explore detailed information or receive GPT-generated insights about their descriptions, enhancing their understanding or guiding them toward self-improvement. Explore the endless possibilities of note-taking with GPT-3.5's intelligent guidance at NoteVault!`;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">Welcome to NoteVault</h1>
      <p className="text-lg mb-6">
      {boldFirstCharacter(paragraphText1)}
      </p>
      <p className="text-lg mb-6">
      {boldFirstCharacter(paragraphText2)}
      </p>
    </div>
  );
}

export default About;
