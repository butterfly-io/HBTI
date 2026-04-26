import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle } from "lucide-react";

const LETTERS = ["A", "B", "C", "D", "E"];

const Quiz = ({ questions, onComplete }) => {
  // answers: { [questionId]: optionIndex }
  const [answers, setAnswers] = useState({});
  const [showError, setShowError] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const progress = Math.round((answeredCount / questions.length) * 100);

  const getOptionKey = (option, index) => option?.key || option?.value || option?.emotion || LETTERS[index];

  const handleSelect = (questionId, index) => {
    setAnswers((prev) => ({ ...prev, [questionId]: index }));
    if (showError) setShowError(false);
  };

  const handleSubmit = () => {
    if (answeredCount < questions.length) {
      setShowError(true);
      // 滚动到第一个未作答的题目
      const firstUnanswered = questions.find((q) => answers[q.id] === undefined);
      if (firstUnanswered) {
        const el = document.getElementById(`q-${firstUnanswered.id}`);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    const result = questions.map((question) => {
      const selectedIndex = answers[question.id];
      return getOptionKey(question.options[selectedIndex], selectedIndex);
    });

    onComplete(result);
  };

  return (
    <div className="min-h-screen px-4 py-10">
      {/* ─── 顶部粘性进度条 ─── */}
      <div className="sticky top-0 z-20 bg-cream-50/90 backdrop-blur-sm pb-3 pt-4 px-2 mb-8">
        <div className="max-w-lg mx-auto">
          <div className="flex justify-between items-center mb-2 text-sm text-fog-500">
            <span>已完成 {answeredCount} / {questions.length} 题</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 rounded-full bg-cream-200 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-sage-500"
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            />
          </div>
        </div>
      </div>

      {/* ─── 题目列表 ─── */}
      <div className="max-w-lg mx-auto space-y-6 pb-6">
        {questions.map((q, qIdx) => {
          const selected = answers[q.id];
          const unanswered = showError && selected === undefined;

          return (
            <motion.div
              id={`q-${q.id}`}
              key={q.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: qIdx * 0.04, type: "spring", stiffness: 180, damping: 22 }}
              className={`herb-card transition-all duration-300 ${
                unanswered
                  ? "ring-2 ring-red-300/70 shadow-[0_0_0_3px_rgba(252,165,165,0.25)]"
                  : ""
              }`}
            >
              {/* 题号 + 题目 */}
              <div className="flex items-start gap-3 mb-4">
                <span
                  className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    selected !== undefined
                      ? "bg-sage-500 text-white"
                      : "bg-cream-200 text-bark-500"
                  }`}
                >
                  {selected !== undefined ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    qIdx + 1
                  )}
                </span>
                <h2 className="font-serif text-bark-700 text-base leading-snug pt-0.5">
                  {q.text}
                </h2>
              </div>

              {/* 选项 */}
              <div className="space-y-2">
                {q.options.map((opt, idx) => {
                  const isSelected = selected === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelect(q.id, idx)}
                      className={`w-full text-left px-4 py-3 rounded-xl border transition-all duration-200 flex items-center gap-3 ${
                        isSelected
                          ? "bg-sage-100 border-sage-400 shadow-softer"
                          : "bg-cream-50 border-cream-200 hover:bg-sage-50 hover:border-sage-300"
                      }`}
                    >
                      <span
                        className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-colors duration-200 ${
                          isSelected
                            ? "bg-sage-500 text-white"
                            : "bg-cream-100 text-bark-500"
                        }`}
                      >
                        {getOptionKey(opt, idx)}
                      </span>
                      <span
                        className={`text-sm leading-relaxed ${
                          isSelected ? "text-sage-800 font-medium" : "text-bark-600"
                        }`}
                      >
                        {opt.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* 未作答提示 */}
              {unanswered && (
                <p className="mt-3 flex items-center gap-1.5 text-red-400 text-xs">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  还没选，戳一下吧～
                </p>
              )}
            </motion.div>
          );
        })}

        {/* ─── 提交按钮 ─── */}
        <div className="pt-2">
          {showError && answeredCount < questions.length && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-2 text-red-400 text-sm mb-3"
            >
              <AlertCircle className="w-4 h-4" />
              还有 {questions.length - answeredCount} 题没回答，往上看看～
            </motion.p>
          )}

          <motion.button
            type="button"
            onClick={handleSubmit}
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.02 }}
            className="w-full py-4 rounded-2xl font-medium text-base transition-all duration-300 bg-sage-500 hover:bg-sage-600 text-white shadow-breath"
          >
            {answeredCount < questions.length
              ? `查看结果（还差 ${questions.length - answeredCount} 题）`
              : "查看我的结果 →"}
          </motion.button>

          <p className="text-center text-fog-400 text-xs mt-3">
            本测试仅供情绪参考，不构成医学诊断
          </p>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
