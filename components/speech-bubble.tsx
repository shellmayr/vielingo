interface SpeechBubbleProps {
  text: string
  position?: {
    top?: number
    left?: number
    right?: number
    bottom?: number
  }
}

export function SpeechBubble({ text, position = {} }: SpeechBubbleProps) {
  return (
    <div
      className="z-50"
      style={{
        position: "relative",
        ...position,
        padding: "8px 16px",
        background: "#f5efd5",
        borderRadius: "20px",
        fontSize: "14px",
        fontWeight: "bold",
        color: "#3a523a",
        whiteSpace: "nowrap",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        display: "inline-block",
      }}
    >
      {text}
      <div
        style={{
          position: "absolute",
          bottom: "-8px",
          left: "20px",
          width: "0",
          height: "0",
          borderLeft: "8px solid transparent",
          borderRight: "8px solid transparent",
          borderTop: "8px solid #f5efd5",
        }}
      />
    </div>
  )
}

