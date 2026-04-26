# 结果页填写说明

## 你现在只改一个文件

直接改 `data/resultContentMap.json`。

里面已经有 15 种人格的映射表了，对应 key 如下：

- `木-郁结`
- `木-宣发`
- `木-流动`
- `火-郁结`
- `火-宣发`
- `火-流动`
- `土-郁结`
- `土-宣发`
- `土-流动`
- `金-郁结`
- `金-宣发`
- `金-流动`
- `水-郁结`
- `水-宣发`
- `水-流动`

每个 key 就是一种人格结果页。

## 你该填哪些字段

每种人格主要填这几个：

```json
{
  "titleLead": "",
  "titleCore": "",
  "titleTail": "",
  "subtitle": "",
  "quote": "",
  "resonanceParagraphs": ["", "", "", ""],
  "cartoonImage": "",
  "cartoonImageAlt": "",
  "cartoonFallback": "",
  "herbArtworkImage": "",
  "herbArtworkAlt": "",
  "herbArtworkFallback": "",
  "artworkCaption": "",
  "visualBadge": "",
  "actionTitle": "现在动一动",
  "actionIcon": "",
  "actionItems": [
    {
      "icon": "",
      "herb": "",
      "text": ""
    }
  ],
  "restartLabel": "再测一次",
  "shareLabel": "保存图片 / 分享给朋友",
  "disclaimer": ""
}
```

## 填写规则

- `titleLead`：五行名，一般不用改，已经帮你填好了。
- `titleCore`：类型名，一般不用改，已经帮你填好了。
- `titleTail`：人格昵称，已经按你当前 15 人格命名填好了，你要改风格就改这里。
- `subtitle`：标题下的小字。
- `quote`：核心金句。
- `resonanceParagraphs`：3 到 5 段描述，每一段就是数组里的一项。
- `cartoonImage`：顶部卡通图文件名，比如 `薄荷.png`。
- `herbArtworkImage`：中药艺术照文件名，比如 `薄荷艺术照.jpeg`。
- `artworkCaption`：艺术照旁边那句斜体短句。
- `visualBadge`：艺术照卡片底部的小标签，比如中药名。
- `actionItems`：行动建议列表，建议 1 到 3 条。
- `disclaimer`：底部小字说明。

## 行动建议怎么填

格式固定这样写：

```json
"actionItems": [
  {
    "icon": "☕",
    "herb": "薄荷",
    "text": "现在就冲一杯薄荷茶，喝第一口时深呼吸三次，让被压住的凉意透透气。"
  }
]
```

## 图片怎么填

你的图片都放在 `data/image` 文件夹里，直接用那个文件夹里的文件名，不用 `public`，也不用别的中转字段。

最直接的填法：

```json
"cartoonImage": "薄荷.png",
"herbArtworkImage": "薄荷艺术照.jpeg"
```

只要这个文件名在 `data/image` 或 `image` 文件夹里存在，页面就会自动显示。

比如当前 [data/image](data/image) 文件夹里已经有：

```text
data/image/薄荷.png
data/image/薄荷艺术照.jpeg
```

所以你可以直接这样写：

```json
"cartoonImage": "薄荷.png",
"herbArtworkImage": "薄荷艺术照.jpeg"
```

如果你懒得写图片文件名，也可以只填：

```json
"visualBadge": "薄荷"
```

系统会自动去 `data/image` 文件夹里找：

```text
薄荷.png
薄荷艺术照.jpeg
```

## 一份可直接照抄的样例

```json
"火-宣发": {
  "titleLead": "火",
  "titleCore": "宣发型",
  "titleTail": "爆燃精神炸",
  "subtitle": "这里填副标题",
  "quote": "这里填核心金句",
  "resonanceParagraphs": [
    "这里是第一段描述。",
    "这里是第二段描述。",
    "这里是第三段描述。",
    "这里是第四段描述。"
  ],
  "cartoonImage": "薄荷.png",
  "cartoonImageAlt": "火系宣发型卡通药材角色",
  "cartoonFallback": "",
  "herbArtworkImage": "薄荷艺术照.jpeg",
  "herbArtworkAlt": "中药艺术照",
  "herbArtworkFallback": "",
  "artworkCaption": "这里填诗意短句。",
  "visualBadge": "薄荷",
  "actionTitle": "现在动一动",
  "actionIcon": "",
  "actionItems": [
    {
      "icon": "☕",
      "herb": "薄荷",
      "text": "现在就冲一杯薄荷茶，喝第一口时深呼吸三次，让被压住的凉意透透气。"
    }
  ],
  "restartLabel": "再测一次",
  "shareLabel": "保存图片 / 分享给朋友",
  "disclaimer": "本结果仅用于情绪观察与互动体验。"
}
```

## 你现在的实际操作顺序

1. 打开 `data/resultContentMap.json`。
2. 找到你要填的人格 key。
3. 先填 `subtitle`、`quote`、`resonanceParagraphs`、`artworkCaption`、`actionItems`。
4. 直接把 `cartoonImage` 和 `herbArtworkImage` 写成 `image` 文件夹里的文件名。
5. 或者只填 `visualBadge` / `actionItems` 里的中药名，让系统自动匹配图片。

除了 `data/resultContentMap.json`，你不需要改别的地方。