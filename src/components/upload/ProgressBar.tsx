type ProgressBarProps = {
  percent: number
}

const squareSize = 48
const strokeWidth = 4
const viewBox = `0 0 ${squareSize} ${squareSize}`
const radius = (squareSize - strokeWidth) / 2
const coord = squareSize / 2
const dashArray = radius * Math.PI * 2

export function ProgressBar({ percent }: ProgressBarProps) {
  const dashOffset = dashArray - (dashArray * percent) / 100

  return (
    <div className="absolute top-2 left-2">
      <svg width={squareSize} height={squareSize} viewBox={viewBox}>
        <circle
          className="text-base-2"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={coord}
          cy={coord}
        />
        <circle
          className="text-primary-5"
          strokeWidth={strokeWidth}
          strokeDasharray={dashArray}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          transform={`rotate(-90 ${coord} ${coord})`}
          r={radius}
          cx={coord}
          cy={coord}
        />
        <text className="text-sm fill-primary-5" x="50%" y="50%" dy=".3em" textAnchor="middle">
          {percent} %
        </text>
      </svg>
    </div>
  )
}
