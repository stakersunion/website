const Badge = ({ children }) => {
  return (
    <div
      className={
        'bg-black text-white text-sm font-black rounded-full w-8 h-8 flex items-center justify-center'
      }
    >
      {children}
    </div>
  )
}

export default Badge
