import { motion } from "framer-motion";
import html2canvas from "html2canvas";
import { Download, ImagePlus, Leaf, RefreshCw, Sparkles } from "lucide-react";
import { useRef, useState } from "react";

const ELEMENT_THEMES = {
  木: {
    background: "linear-gradient(145deg, #d1f0da 0%, #7ec491 45%, #3d8f53 100%)",
    titleGradient: "linear-gradient(135deg, #1a4228 0%, #2e6b40 55%, #1d5232 100%)",
    panelBackground: "rgba(255, 255, 255, 0.62)",
    panelBorder: "rgba(90, 170, 110, 0.30)",
    softAccent: "rgba(80, 175, 105, 0.30)",
    shadow: "rgba(20, 60, 30, 0.12)",
    artworkGradient: "linear-gradient(155deg, rgba(205, 245, 215, 0.88), rgba(160, 220, 175, 0.72))",
    buttonFill: "rgba(40, 100, 55, 0.10)",
    buttonSolid: "#2d6e40",
    buttonText: "#ffffff",
    textPrimary: "#1a4028",
    textSecondary: "rgba(26, 64, 40, 0.78)",
    textMuted: "rgba(26, 64, 40, 0.52)",
    textDivider: "rgba(26, 64, 40, 0.30)",
    itemBackground: "rgba(60, 140, 80, 0.08)",
    skeletonColor: "rgba(26, 64, 40, 0.12)",
  },
  火: {
    background: "linear-gradient(145deg, #fde0cc 0%, #f49a65 45%, #c45528 100%)",
    titleGradient: "linear-gradient(135deg, #5c1a0a 0%, #922e15 55%, #6b2010 100%)",
    panelBackground: "rgba(255, 255, 255, 0.62)",
    panelBorder: "rgba(210, 120, 80, 0.30)",
    softAccent: "rgba(235, 120, 72, 0.26)",
    shadow: "rgba(80, 20, 10, 0.12)",
    artworkGradient: "linear-gradient(155deg, rgba(255, 230, 210, 0.88), rgba(248, 195, 158, 0.72))",
    buttonFill: "rgba(120, 40, 20, 0.10)",
    buttonSolid: "#b03a22",
    buttonText: "#ffffff",
    textPrimary: "#5c1a0a",
    textSecondary: "rgba(92, 26, 10, 0.78)",
    textMuted: "rgba(92, 26, 10, 0.52)",
    textDivider: "rgba(92, 26, 10, 0.30)",
    itemBackground: "rgba(160, 60, 30, 0.07)",
    skeletonColor: "rgba(92, 26, 10, 0.12)",
  },
  土: {
    background: "linear-gradient(145deg, #fef0c0 0%, #f0c040 45%, #b8860b 100%)",
    titleGradient: "linear-gradient(135deg, #3d2506 0%, #6b3e10 55%, #4a2c08 100%)",
    panelBackground: "rgba(255, 255, 255, 0.62)",
    panelBorder: "rgba(190, 145, 40, 0.30)",
    softAccent: "rgba(230, 180, 40, 0.30)",
    shadow: "rgba(60, 38, 10, 0.12)",
    artworkGradient: "linear-gradient(155deg, rgba(255, 248, 200, 0.88), rgba(248, 225, 145, 0.72))",
    buttonFill: "rgba(100, 60, 15, 0.10)",
    buttonSolid: "#7a4c18",
    buttonText: "#ffffff",
    textPrimary: "#3d2506",
    textSecondary: "rgba(61, 37, 6, 0.78)",
    textMuted: "rgba(61, 37, 6, 0.52)",
    textDivider: "rgba(61, 37, 6, 0.30)",
    itemBackground: "rgba(120, 75, 15, 0.07)",
    skeletonColor: "rgba(61, 37, 6, 0.12)",
  },
  金: {
    background: "linear-gradient(145deg, #ecf2f8 0%, #b8cfe0 45%, #7a9db8 100%)",
    titleGradient: "linear-gradient(135deg, #1a2d3e 0%, #2e4a68 55%, #1e3555 100%)",
    panelBackground: "rgba(255, 255, 255, 0.62)",
    panelBorder: "rgba(110, 155, 195, 0.32)",
    softAccent: "rgba(120, 165, 210, 0.30)",
    shadow: "rgba(25, 40, 60, 0.12)",
    artworkGradient: "linear-gradient(155deg, rgba(225, 240, 255, 0.88), rgba(190, 215, 240, 0.72))",
    buttonFill: "rgba(30, 55, 85, 0.10)",
    buttonSolid: "#2c4a6e",
    buttonText: "#ffffff",
    textPrimary: "#1a2d3e",
    textSecondary: "rgba(26, 45, 62, 0.78)",
    textMuted: "rgba(26, 45, 62, 0.52)",
    textDivider: "rgba(26, 45, 62, 0.30)",
    itemBackground: "rgba(40, 75, 115, 0.07)",
    skeletonColor: "rgba(26, 45, 62, 0.12)",
  },
  水: {
    background: "linear-gradient(145deg, #d0e8ff 0%, #6aa8f0 45%, #2060c0 100%)",
    titleGradient: "linear-gradient(135deg, #0a1f3c 0%, #1a3a6e 55%, #0e2858 100%)",
    panelBackground: "rgba(255, 255, 255, 0.62)",
    panelBorder: "rgba(70, 130, 210, 0.30)",
    softAccent: "rgba(75, 148, 238, 0.28)",
    shadow: "rgba(10, 25, 55, 0.12)",
    artworkGradient: "linear-gradient(155deg, rgba(205, 232, 255, 0.88), rgba(165, 210, 255, 0.72))",
    buttonFill: "rgba(15, 45, 100, 0.10)",
    buttonSolid: "#1a4a8a",
    buttonText: "#ffffff",
    textPrimary: "#0a1f3c",
    textSecondary: "rgba(10, 31, 60, 0.78)",
    textMuted: "rgba(10, 31, 60, 0.52)",
    textDivider: "rgba(10, 31, 60, 0.30)",
    itemBackground: "rgba(20, 60, 130, 0.07)",
    skeletonColor: "rgba(10, 31, 60, 0.12)",
  },
};

const isImageSource = (value) =>
  typeof value === "string" &&
  /^(https?:|data:|blob:|\/)/.test(value.trim()) ||
  /\.(png|jpe?g|gif|svg|webp|avif)$/i.test(String(value || "").trim());

const normalizeParagraphs = (value) => {
  if (Array.isArray(value)) {
    return value.map((item) => String(item || ""));
  }

  if (typeof value === "string") {
    return value.split("\n\n").map((item) => item.trim());
  }

  return [];
};

const normalizeActionItems = (value) => {
  if (Array.isArray(value)) {
    return value.map((item) => {
      if (typeof item === "string") {
        return { text: item, herb: "", icon: "" };
      }

      return {
        text: item?.text || item?.文案 || "",
        herb: item?.herb || item?.中药 || "",
        icon: item?.icon || item?.图标 || "",
      };
    });
  }

  if (typeof value === "string") {
    return [{ text: value, herb: "", icon: "" }];
  }

  return [];
};

const SlotLines = ({ widths, className = "", lineClassName = "", opacity = 0.14 }) => (
  <div className={`flex flex-col gap-2 ${className}`}>
    {widths.map((width, index) => (
      <div
        key={`${width}-${index}`}
        className={`rounded-full ${lineClassName}`}
        style={{
          width,
          background: `rgba(0,0,0,${opacity})`,
          minHeight: "0.7rem",
        }}
      />
    ))}
  </div>
);

const VisualSlot = ({ src, alt, fallback, roundedClassName, frameStyle, imageClassName }) => {
  const hasImage = isImageSource(src);
  const hasFallback = typeof fallback === "string" && fallback.trim().length > 0;

  return (
    <div
      className={`relative overflow-hidden ${roundedClassName}`}
      style={frameStyle}
    >
      {hasImage ? (
        <img src={src} alt={alt} className={imageClassName} />
      ) : hasFallback ? (
        <div className="flex h-full w-full items-center justify-center text-4xl text-white/80">
          {fallback}
        </div>
      ) : (
        <div className="relative flex h-full w-full items-center justify-center">
          <div className="absolute inset-[18%] rounded-[28px] border border-white/15" />
          <div className="absolute inset-[30%] rounded-[22px] border border-white/10" />
          <ImagePlus className="relative z-10 h-8 w-8 text-white/30" />
        </div>
      )}
    </div>
  );
};

const Result = ({ result, onRestart }) => {
  const captureRef = useRef(null);
  const [isSaving, setIsSaving] = useState(false);
  const themeKey = result?.themeKey || result?.main_element || result?.五行 || "火";
  const theme = ELEMENT_THEMES[themeKey] || ELEMENT_THEMES.火;

  const titleLead = result?.titleLead || result?.标题前缀 || "";
  const titleCore = result?.titleCore || result?.标题主体 || "";
  const titleTail = result?.titleTail || result?.标题尾缀 || "";
  const subtitle = result?.subtitle || result?.副标题 || "";
  const quote = result?.quote || result?.金句 || "";
  const resonanceParagraphs = normalizeParagraphs(
    result?.resonanceParagraphs || result?.描述段落 || result?.描述
  );
  const artworkCaption = result?.artworkCaption || result?.彩蛋 || "";
  const actionTitle = result?.actionTitle || result?.行动标题 || "";
  const actionItems = normalizeActionItems(
    result?.actionItems || result?.行动建议列表 || result?.行动建议
  );
  const restartLabel = result?.restartLabel || result?.重测按钮文案 || "";
  const shareLabel = result?.shareLabel || result?.分享按钮文案 || "";
  const disclaimer = result?.disclaimer || result?.免责声明 || "";
  const cartoonImage = result?.cartoonImage || result?.卡通图像 || result?.卡通图 || "";
  const herbArtworkImage =
    result?.herbArtworkImage || result?.中药艺术照 || result?.药材图 || "";
  const visualBadge = result?.visualBadge || result?.视觉角标 || "";
  const actionIcon = result?.actionIcon || result?.行动图标 || "";

  const hasTitle = [titleLead, titleCore, titleTail].some(Boolean);
  const displayParagraphs = resonanceParagraphs.some(Boolean)
    ? resonanceParagraphs
    : ["", "", "", ""];
  const displayActionItems = actionItems.length > 0 ? actionItems : [{ text: "", herb: "", icon: "" }];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.14, delayChildren: 0.1 },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 180, damping: 24 },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const quoteVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.68, ease: [0.2, 0.8, 0.2, 1], delay: 0.15 },
    },
  };

  const handleSaveImage = async () => {
    if (!captureRef.current || isSaving) return;
    setIsSaving(true);
    try {
      const canvas = await html2canvas(captureRef.current, {
        useCORS: true,
        allowTaint: true,
        scale: 2,
        backgroundColor: null,
        scrollX: 0,
        scrollY: 0,
        windowWidth: captureRef.current.scrollWidth,
        windowHeight: captureRef.current.scrollHeight,
        width: captureRef.current.scrollWidth,
        height: captureRef.current.scrollHeight,
      });
      const link = document.createElement("a");
      const name = [titleLead, titleCore, titleTail].filter(Boolean).join("-") || "hbti-result";
      link.download = `${name}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (e) {
      console.error("保存图片失败", e);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      ref={captureRef}
      className="relative min-h-screen overflow-hidden px-4 py-6 sm:px-6 sm:py-8"
      style={{ background: theme.background }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            `radial-gradient(circle at 18% 20%, ${theme.softAccent} 0%, rgba(255,255,255,0) 28%), ` +
            `radial-gradient(circle at 82% 18%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 24%), ` +
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 320 320' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='ink'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23ink)' opacity='0.055'/%3E%3C/svg%3E\")",
          backgroundRepeat: "no-repeat, no-repeat, repeat",
          backgroundSize: "100% 100%, 100% 100%, 240px 240px",
        }}
      />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -left-24 top-20 h-56 w-56 rounded-full blur-3xl"
          style={{ background: "rgba(255,255,255,0.14)" }}
        />
        <div
          className="absolute -right-20 bottom-24 h-64 w-64 rounded-full blur-3xl"
          style={{ background: theme.softAccent }}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex w-full max-w-[28rem] flex-col gap-4"
      >
        <motion.section
          variants={sectionVariants}
          className="flex min-h-[22vh] flex-col items-center justify-center rounded-[2rem] px-5 py-6 text-center"
          style={{
            background: theme.panelBackground,
            backdropFilter: "blur(14px)",
            border: `1px solid ${theme.panelBorder}`,
            boxShadow: `0 20px 40px -24px ${theme.shadow}`,
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.82, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 210, damping: 20, delay: 0.08 }}
            className="mb-3 w-full flex justify-center"
          >
            <VisualSlot
              src={cartoonImage}
              alt={result?.cartoonImageAlt || result?.卡通图像说明 || ""}
              fallback={result?.cartoonFallback || result?.卡通图占位符 || ""}
              roundedClassName="w-[180px] sm:w-[210px] rounded-none"
              frameStyle={{ background: "transparent", border: "none" }}
              imageClassName="w-full h-auto block object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.22)]"
            />
          </motion.div>

          <motion.div variants={titleVariants} className="w-full">
            {hasTitle ? (
              <h1
                className="result-display-font text-[1.95rem] font-semibold leading-[1.15] tracking-[0.08em] sm:text-[2.2rem]"
                style={{ color: theme.textPrimary }}
              >
                {titleLead ? <span style={{ color: theme.textPrimary }}>{titleLead}</span> : null}
                {titleLead && titleCore ? <span className="mx-1.5" style={{ color: theme.textDivider }}>·</span> : null}
                {titleCore ? (
                  <span
                    style={{
                      backgroundImage: theme.titleGradient,
                      WebkitBackgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    {titleCore}
                  </span>
                ) : null}
                {titleTail && (titleLead || titleCore) ? (
                  <span className="mx-1.5" style={{ color: theme.textDivider }}>·</span>
                ) : null}
                {titleTail ? <span style={{ color: theme.textPrimary }}>{titleTail}</span> : null}
              </h1>
            ) : (
              <SlotLines
                widths={["72%", "48%"]}
                className="mx-auto max-w-[17rem] items-center"
                lineClassName="h-4 sm:h-5"
                opacity={0.24}
              />
            )}
          </motion.div>

          <motion.div variants={titleVariants} className="mt-3 w-full">
            {subtitle ? (
              <p className="mx-auto max-w-[18rem] text-sm font-light leading-relaxed" style={{ color: theme.textMuted }}>
                {subtitle}
              </p>
            ) : (
              <SlotLines
                widths={["58%"]}
                className="mx-auto max-w-[11rem] items-center"
                lineClassName="h-2.5"
                opacity={0.14}
              />
            )}
          </motion.div>
        </motion.section>

        <motion.section
          variants={sectionVariants}
          className="min-h-[28vh] rounded-[2rem] px-5 py-6"
          style={{
            background: theme.panelBackground,
            backdropFilter: "blur(18px)",
            border: `1px solid ${theme.panelBorder}`,
            boxShadow: `0 26px 44px -28px ${theme.shadow}`,
          }}
        >
          <motion.div variants={quoteVariants} className="mb-5">
            {quote ? (
              <p className="result-display-font text-center text-[1.2rem] leading-[1.7] sm:text-[1.3rem]" style={{ color: theme.textPrimary }}>
                {quote}
              </p>
            ) : (
              <SlotLines
                widths={["88%", "74%"]}
                className="mx-auto max-w-[18rem] items-center"
                lineClassName="h-4"Z
                opacity={0.26}
              />
            )}
          </motion.div>

          <div className="flex h-full flex-col justify-between gap-4">
            {displayParagraphs.map((paragraph, index) => (
              <motion.div key={`paragraph-${index}`} variants={sectionVariants}>
                {paragraph ? (
                  <p className="text-sm leading-7" style={{ color: theme.textSecondary }}>{paragraph}</p>
                ) : (
                  <SlotLines
                    widths={index % 2 === 0 ? ["100%", "92%", "78%"] : ["96%", "88%", "70%"]}
                    lineClassName="h-2.5"
                    opacity={0.16}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          variants={sectionVariants}
          className="min-h-[15vh] rounded-[2rem] px-5 py-5"
          style={{
            background: theme.artworkGradient,
            border: `1px solid ${theme.panelBorder}`,
            boxShadow: `0 24px 44px -30px ${theme.shadow}`,
          }}
        >
          <div className="flex h-full items-center gap-4">
            <motion.div
              initial={{ opacity: 0, y: 18, rotate: -4 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.24 }}
              className="relative shrink-0"
            >
              <div
                className="absolute inset-2 rounded-[1.5rem] blur-xl"
                style={{ background: "rgba(255,255,255,0.18)" }}
              />
              <VisualSlot
                src={herbArtworkImage}
                alt={result?.herbArtworkAlt || result?.中药艺术照说明 || ""}
                fallback={result?.herbArtworkFallback || result?.中药艺术照占位符 || ""}
                roundedClassName="relative h-24 w-24 rounded-[1.75rem]"
                frameStyle={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  boxShadow: "0 14px 28px rgba(0,0,0,0.18)",
                  backdropFilter: "blur(10px)",
                }}
                imageClassName="h-full w-full object-cover"
              />
              {visualBadge ? (
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[10px] tracking-[0.24em] backdrop-blur-sm" style={{ border: `1px solid ${theme.panelBorder}`, background: theme.panelBackground, color: theme.textMuted }}>
                  {visualBadge}
                </span>
              ) : null}
            </motion.div>

            <div className="flex-1">
              {artworkCaption ? (
                <p className="result-display-font text-sm leading-7 italic" style={{ color: theme.textSecondary }}>
                  {artworkCaption}
                </p>
              ) : (
                <SlotLines
                  widths={["94%", "80%", "62%"]}
                  lineClassName="h-2.5"
                  opacity={0.15}
                />
              )}
            </div>
          </div>
        </motion.section>

        <motion.section
          variants={sectionVariants}
          className="min-h-[18vh] rounded-[2rem] px-5 py-5"
          style={{
            background: theme.panelBackground,
            backdropFilter: "blur(16px)",
            border: `1px solid ${theme.panelBorder}`,
          }}
        >
          <div className="mb-4 flex items-center gap-2" style={{ color: theme.textMuted }}>
            <Leaf className="h-4 w-4" />
            {actionTitle ? (
              <span className="text-sm font-medium tracking-[0.18em]">{actionTitle}</span>
            ) : (
              <div className="h-2.5 w-24 rounded-full" style={{ background: theme.skeletonColor }} />
            )}
          </div>

          <div className="flex flex-col gap-3">
            {displayActionItems.map((item, index) => (
              <motion.div
                key={`action-${index}`}
                variants={sectionVariants}
                className="flex items-start gap-3 rounded-[1.5rem] px-4 py-3"
                style={{ background: theme.itemBackground }}
              >
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl" style={{ border: `1px solid ${theme.panelBorder}`, background: theme.itemBackground, color: theme.textPrimary }}>
                  {item.icon || actionIcon ? (
                    <span className="text-lg">{item.icon || actionIcon}</span>
                  ) : (
                    <Sparkles className="h-4 w-4" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  {item.herb ? (
                    <div className="mb-2 inline-flex rounded-full px-2.5 py-1 text-[10px] tracking-[0.22em]" style={{ border: `1px solid ${theme.panelBorder}`, background: theme.itemBackground, color: theme.textMuted }}>
                      {item.herb}
                    </div>
                  ) : null}

                  {item.text ? (
                    <p className="text-sm leading-7" style={{ color: theme.textPrimary }}>{item.text}</p>
                  ) : (
                    <SlotLines
                      widths={["100%", "88%", "72%"]}
                      lineClassName="h-2.5"
                      opacity={0.16}
                    />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.div variants={sectionVariants} className="grid grid-cols-2 gap-3">
          <button
            onClick={onRestart}
            type="button"
            className="flex min-h-16 items-center justify-center gap-2 rounded-[1.5rem] px-4 py-4 transition-transform duration-200 active:scale-[0.98]"
            style={{
              background: theme.buttonFill,
              border: `1px solid ${theme.panelBorder}`,
              color: theme.textPrimary,
              backdropFilter: "blur(10px)",
            }}
          >
            <RefreshCw className="h-4 w-4 shrink-0" />
            {restartLabel ? (
              <span className="text-sm font-medium tracking-[0.08em]">{restartLabel}</span>
            ) : (
              <div className="h-2.5 w-16 rounded-full" style={{ background: theme.skeletonColor }} />
            )}
          </button>

          <button
            onClick={handleSaveImage}
            type="button"
            disabled={isSaving}
            className="flex min-h-16 items-center justify-center gap-2 rounded-[1.5rem] px-4 py-4 transition-transform duration-200 active:scale-[0.98] disabled:opacity-60"
            style={{
              background: theme.buttonSolid,
              color: theme.buttonText,
              boxShadow: `0 18px 30px -24px ${theme.shadow}`,
            }}
          >
            <Download className="h-4 w-4 shrink-0" />
            <span className="text-sm font-medium tracking-[0.08em]">
              {isSaving ? "生成中…" : (shareLabel || "保存图片")}
            </span>
          </button>
        </motion.div>

        <motion.div variants={sectionVariants} className="pb-2 text-center">
          {disclaimer ? (
            <p className="text-xs leading-6" style={{ color: theme.textDivider }}>{disclaimer}</p>
          ) : (
            <div className="mx-auto h-2.5 w-36 rounded-full" style={{ background: "rgba(0,0,0,0.10)" }} />
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Result;