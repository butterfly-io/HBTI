// utils/resultCalculator.js
import resultContentMap from "../data/resultContentMap.json";
import { quizConfig, resultMapping } from "../data/qustions";

const imageModules = {
  ...import.meta.glob("../image/*.{png,jpg,jpeg,webp,avif,svg}", {
    eager: true,
    import: "default",
  }),
  ...import.meta.glob("../data/image/*.{png,jpg,jpeg,webp,avif,svg}", {
    eager: true,
    import: "default",
  }),
};

const ELEMENTS = quizConfig.dimensions.elements;
const STYLES = quizConfig.dimensions.styles;

const STYLE_TIE_BREAKERS = {
  宣发: ["火", "木"],
  流动: ["水", "金"],
  郁结: ["木", "土"],
};

const ELEMENT_THEME = {
  木: {
    背景渐变: "linear-gradient(150deg, #a7f3b0 0%, #14532d 100%)",
  },
  火: {
    背景渐变: "linear-gradient(150deg, #fb923c 0%, #7f1d1d 100%)",
  },
  土: {
    背景渐变: "linear-gradient(150deg, #f8d46a 0%, #78350f 100%)",
  },
  金: {
    背景渐变: "linear-gradient(150deg, #e2e8f0 0%, #475569 100%)",
  },
  水: {
    背景渐变: "linear-gradient(150deg, #2563eb 0%, #0f172a 100%)",
  },
};

const IMAGE_ASSET_MAPS = Object.entries(imageModules).reduce(
  (maps, [filePath, assetUrl]) => {
    const fileName = filePath.split("/").pop() || "";
    const baseName = fileName.replace(/\.[^.]+$/, "");

    maps.byFileName[fileName] = assetUrl;
    maps.byBaseName[baseName] = assetUrl;

    return maps;
  },
  { byFileName: {}, byBaseName: {} }
);

const isDirectImagePath = (value) =>
  typeof value === "string" && /^(https?:|data:|blob:|\/)/.test(value.trim());

const resolveImageAsset = (value) => {
  if (typeof value !== "string") {
    return "";
  }

  const trimmed = value.trim();

  if (!trimmed) {
    return "";
  }

  if (isDirectImagePath(trimmed)) {
    return trimmed;
  }

  const baseName = trimmed.replace(/\.[^.]+$/, "");

  return IMAGE_ASSET_MAPS.byFileName[trimmed] || IMAGE_ASSET_MAPS.byBaseName[baseName] || "";
};

const pickDisplayHerbName = (content) => {
  if (typeof content.visualBadge === "string" && content.visualBadge.trim()) {
    return content.visualBadge.trim();
  }

  if (Array.isArray(content.actionItems)) {
    const herbItem = content.actionItems.find(
      (item) => typeof item?.herb === "string" && item.herb.trim()
    );

    if (herbItem) {
      return herbItem.herb.trim();
    }
  }

  return "";
};

const createEmptyElementScores = () => ({ 木: 0, 火: 0, 土: 0, 金: 0, 水: 0 });
const createEmptyStyleScores = () => ({ 郁结: 0, 宣发: 0, 流动: 0 });

const pickHighestKey = (scores, keys) => {
  let bestKey = keys[0];
  let bestScore = scores[bestKey];

  keys.slice(1).forEach((key) => {
    if (scores[key] > bestScore) {
      bestKey = key;
      bestScore = scores[key];
    }
  });

  return bestKey;
};

const pickMainElement = (elementScores, mainStyle) => {
  const topScore = Math.max(...ELEMENTS.map((element) => elementScores[element]));
  const tiedElements = ELEMENTS.filter((element) => elementScores[element] === topScore);

  if (tiedElements.length === 1) {
    return tiedElements[0];
  }

  const stylePriority = STYLE_TIE_BREAKERS[mainStyle] || [];
  const preferred = stylePriority.find((element) => tiedElements.includes(element));

  return preferred || tiedElements[0];
};

const getPhase = (elementScores) => {
  const sorted = [...ELEMENTS]
    .sort((left, right) => {
      const scoreDiff = elementScores[right] - elementScores[left];
      if (scoreDiff !== 0) {
        return scoreDiff;
      }

      return ELEMENTS.indexOf(left) - ELEMENTS.indexOf(right);
    });

  const first = sorted[0];
  const second = sorted[1];

  if (elementScores[first] - elementScores[second] <= 3) {
    return `${first}${second}相生`;
  }

  return null;
};

/**
 * 根据题目 JSON 中的五行/风格分值，计算五行情绪谱结果。
 *
 * @param {string[]} answers - 长度为 20 的答案数组，元素为 A/B/C/D/E
 * @returns {Object} 结果对象
 */
export const calculateResult = (answers) => {
  const element_scores = createEmptyElementScores();
  const style_scores = createEmptyStyleScores();

  Object.values(quizConfig.questions).forEach((question, index) => {
    const answer = answers[index];

    if (!answer || answer === "E") {
      return;
    }

    const option = question.options[answer];

    if (!option) {
      return;
    }

    ELEMENTS.forEach((element) => {
      element_scores[element] += Number(option[element] || 0);
    });

    STYLES.forEach((style) => {
      style_scores[style] += Number(option[style] || 0);
    });
  });

  const main_style = pickHighestKey(style_scores, STYLES);
  const main_element = pickMainElement(element_scores, main_style);
  const nickname = resultMapping?.[main_element]?.[main_style] || `${main_element}${main_style}`;
  const phase = getPhase(element_scores);
  const theme = ELEMENT_THEME[main_element];
  const semanticKey = `${main_element}-${main_style}`;
  const content = resultContentMap[semanticKey] || {};
  const herbName = pickDisplayHerbName(content);
  const resolvedContent = {
    ...content,
    cartoonImage:
      resolveImageAsset(content.cartoonImage) ||
      resolveImageAsset(herbName),
    cartoonImageAlt:
      content.cartoonImageAlt || (herbName ? `${herbName}卡通形象` : ""),
    herbArtworkImage:
      resolveImageAsset(content.herbArtworkImage) ||
      resolveImageAsset(herbName ? `${herbName}艺术照` : ""),
    herbArtworkAlt:
      content.herbArtworkAlt || (herbName ? `${herbName}艺术照` : ""),
  };
  const titleLead = resolvedContent.titleLead || main_element;
  const titleCore = resolvedContent.titleCore || `${main_style}型`;
  const titleTail = resolvedContent.titleTail || nickname;
  const fullTitle = [titleLead, titleCore, titleTail].filter(Boolean).join("·");

  return {
    main_element,
    main_style,
    themeKey: main_element,
    nickname: titleTail,
    full_title: fullTitle,
    element_scores,
    style_scores,
    phase,
    五行: main_element,
    label: titleCore,
    herb: titleTail,
    herbIcon: "",
    卡通图: "",
    药材图: "",
    背景渐变: theme.背景渐变,
    title: fullTitle,
    titleLead,
    titleCore,
    titleTail,
    subtitle: "",
    金句: "",
    quote: "",
    描述: "",
    resonanceParagraphs: ["", "", "", ""],
    彩蛋: "",
    artworkCaption: "",
    行动标题: "",
    actionTitle: "",
    行动建议: "",
    actionItems: [{ icon: "", herb: "", text: "" }],
    actionIcon: "",
    cartoonImage: "",
    cartoonImageAlt: "",
    herbArtworkImage: "",
    herbArtworkAlt: "",
    visualBadge: "",
    restartLabel: "",
    shareLabel: "",
    disclaimer: "",
    semanticKey,
    defaultTitleParts: {
      element: main_element,
      style: main_style,
      nickname,
    },
    ...resolvedContent,
  };
};

export default calculateResult;