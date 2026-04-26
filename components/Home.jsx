import { motion } from "framer-motion";

const Home = ({ onStart }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* 背景装饰 - 柔和的圆形光晕 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-sage-200/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cream-200/40 rounded-full blur-3xl"
        />
      </div>

      {/* 主内容 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 max-w-lg w-full text-center"
      >
        {/* 小标题/标签 */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-sage-500 text-sm tracking-widest mb-4 font-medium"
        >
          {/* ========== 请填写标签文字，如：「中医情绪体质测试」或「HBTI」========== */}
          HBTI
        </motion.p>

        {/* 主标题 */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-3xl md:text-4xl font-serif text-bark-700 mb-6"
        >
          {/* ========== 请填写主标题，如：「你的情绪，是什么体质？」========== */}
          [来不及为SBTI的落幕感到悲伤，接下来登场的是HBTI！]
        </motion.h1>

        {/* 引导文案 - 最重要的一句共鸣 */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-bark-500 text-lg md:text-xl leading-relaxed mb-10 font-light"
        >
          {/* ========== 请填写一句有共鸣的引导文案，例如：「你最近，是不是有点不太对劲？」========== */}
          [15种人格，请选择你的专属中药]
        </motion.p>

        {/* 开始按钮 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <button
            onClick={onStart}
            type="button"
            className="
              px-10 py-6 
              bg-sage-500 hover:bg-sage-600 
              text-white font-medium 
              rounded-full 
              text-lg
              shadow-soft
              transition-all duration-300
              hover:shadow-breath hover:scale-105
              active:scale-95
            "
          >
            {/* ========== 请填写按钮文字，如：「开始测试」========== */}
            [开始测试]
          </button>
        </motion.div>

        {/* 底部说明文字 */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="text-fog-400 text-sm mt-8"
        >
          {/* ========== 可选：填写耗时提示，如：「约 3 分钟 · 31 道题」========== */}
          [约 2 分钟 · 20 道题]
        </motion.p>
      </motion.div>

      {/* 底部装饰 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
              className="w-2 h-2 bg-sage-300 rounded-full"
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Home;