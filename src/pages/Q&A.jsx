import { AnimatePresence, motion } from 'framer-motion';
import React, { useRef, useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid'; // Import uuid for unique IDs
import { QuestionCard } from '../features/Q&A/QuestionCard';

const QuestionList = () => {
  const [questions, setQuestions] = useState([]); // Stores an array of submitted questions.
  const [newQuestion, setNewQuestion] = useState(''); // Stores the text entered in the textarea
  const [isSubmitting, setIsSubmitting] = useState(false); // defaultly will enable to submit Questions
  const formRef = useRef(null);

  const handleSubmitQuestion = (e) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;
    setIsSubmitting(true); // during submiting will disabled submit btn

    const newQ = {
      id: uuidv4(), // Use uuid for unique ID
      title: newQuestion.trim(),
      content: '',
      answer: '',
      comments: [],
      likes: 0,
      createdAt: new Date().toISOString(),
    };
    setQuestions((prev) => [newQ, ...prev]);

    setNewQuestion('');
    setTimeout(() => {
      setIsSubmitting(false);
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 500);
  };

  return (
    <div className="min-h-screen md:mt-14 mt-10 py-8 px-4">
      <h1 className="flex justify-center font-bold text-2xl md:text-3xl my-4 underline">
        Questions & Answers
      </h1>
      <div className="max-w-4xl mx-auto space-y-8">
        <motion.form
          ref={formRef}
          onSubmit={handleSubmitQuestion}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-xl scroll-mt-20 px-4 md:px-4 py-2 bg-white/5 backdrop-blur-sm"
        >
          <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
            Ask here...
          </h2>

          <textarea
            name="message"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmitQuestion(e);
              }
            }}
            className="w-full bg-white/5 rounded-lg px-4 py-2 text-white placeholder-gray-300 border-[.5px] outline-none focus:ring-2 focus:ring-[#2BA4AB] transition-all resize-none"
            placeholder="Type your question here..."
            rows="3"
            disabled={isSubmitting}
          />

          <div className="flex justify-between items-center mt-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#2BA4AB] text-white px-4 py-2 rounded-lg duration-300 transform active:scale-95 cursor-pointer hover:bg-[#23898e] transition-colors flex items-center gap-2"
            >
              {isSubmitting ? (
                'Posting...'
              ) : (
                <>
                  <FaPaperPlane />
                  <span className="hidden md:inline">Submit Question</span>
                  <span className="md:hidden inline">Post</span>
                </>
              )}
            </button>
          </div>
        </motion.form>

        <AnimatePresence>
          {questions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              setQuestions={setQuestions}
              isAdmin={true}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default QuestionList;
