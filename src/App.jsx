import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('itask-todos')
    return saved ? JSON.parse(saved) : []
  })
  const [todo, setTodo] = useState("")
  const [showFinished, setShowFinished] = useState(false)

  useEffect(() => {
    localStorage.setItem('itask-todos', JSON.stringify(todos))
  }, [todos])

  const handleAdd = () => {
    if (todo.trim().length > 1) {
      setTodos([...todos, { id: Date.now(), text: todo, isCompleted: false }])
      setTodo("")
      setShowFinished(false)
    }
  }

  const handleDelete = (id) => {
    setTodos(todos.filter(t => t.id !== id))
  }

  const handleEdit = (id) => {
    const t = todos.find(t => t.id === id)
    setTodo(t.text)
    handleDelete(id)
    setShowFinished(false)
  }

  const handleCheckbox = (id) => {
    setTodos(todos.map(t => t.id === id ? { ...t, isCompleted: !t.isCompleted } : t))
  }

  const handleDoubleClick = (id) => {
    setTodos(todos.map(t => t.id === id ? { ...t, isCompleted: !t.isCompleted } : t))
  }

  const filteredTodos = showFinished
    ? todos.filter(t => t.isCompleted)
    : todos.filter(t => !t.isCompleted)

  const completedCount = todos.filter(t => t.isCompleted).length
  const noFinishedTasks = showFinished && completedCount === 0

  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full overflow-x-hidden bg-[#0a0a0f]" style={{
        backgroundImage: `radial-gradient(ellipse 80% 50% at 20% -10%, rgba(120,60,255,0.25) 0%, transparent 60%),
                          radial-gradient(ellipse 60% 40% at 80% 110%, rgba(60,180,255,0.15) 0%, transparent 60%)`
      }}>
        <div className="w-full max-w-3xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-6 xs:py-8 sm:py-10 lg:py-14">

          <div className="text-center mb-6 xs:mb-7 sm:mb-8 lg:mb-10">
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight bg-gradient-to-br from-white via-white to-violet-400 bg-clip-text text-transparent mb-1">
              Your Todos
            </h1>
            <p className="text-[#6b6b8a] text-xs sm:text-sm font-light tracking-widest">
              stay focused · get things done
            </p>
          </div>

          <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-3 xs:p-4 sm:p-5 mb-5 xs:mb-6 sm:mb-7 backdrop-blur-md focus-within:border-violet-500/50 transition-colors duration-300">
            <div className="flex flex-col xs:flex-row gap-2 xs:gap-3">
              <input
                type="text"
                placeholder="What needs to be done?"
                value={todo}
                onChange={e => {
                  const val = e.target.value
                  setTodo(val.charAt(0).toUpperCase() + val.slice(1))
                }}
                onKeyDown={e => e.key === 'Enter' && handleAdd()}
                className="flex-1 bg-white/[0.06] border border-white/10 rounded-xl px-3 xs:px-4 py-2.5 xs:py-3 text-white placeholder-[#4a4a6a] text-sm font-light outline-none focus:bg-white/[0.09] focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/10 transition-all duration-200 w-full"
              />
              <button
                onClick={handleAdd}
                className="w-full xs:w-auto bg-gradient-to-br from-violet-600 to-indigo-600 text-white font-bold text-sm tracking-wide px-5 py-2.5 xs:py-3 rounded-xl hover:-translate-y-0.5 hover:shadow-[0_6px_28px_rgba(124,58,237,0.5)] active:translate-y-0 transition-all duration-200 shadow-[0_4px_20px_rgba(124,58,237,0.35)]"
              >
                + Add
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between mb-3 sm:mb-4 px-1">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-[#4a4a6a] text-xs font-bold tracking-[0.15em] uppercase flex-shrink-0">
                {showFinished ? 'Completed' : 'Tasks'}
              </span>
              {!showFinished && todos.filter(t => !t.isCompleted).length > 0 && (
                <span className="bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0">
                  {todos.filter(t => !t.isCompleted).length} remaining
                </span>
              )}
              {showFinished && completedCount > 0 && (
                <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0">
                  {completedCount} done
                </span>
              )}
            </div>

            <div
              onClick={() => setShowFinished(!showFinished)}
              className="flex items-center gap-1.5 xs:gap-2 cursor-pointer group flex-shrink-0 ml-2"
            >
              <span className="text-[#6b6b8a] text-xs font-medium tracking-wide group-hover:text-violet-400 transition-colors duration-200">
                {showFinished ? 'Show pending' : 'Show finished'}
              </span>
              <div className={`w-9 h-5 rounded-full relative transition-all duration-300 flex-shrink-0 ${showFinished ? 'bg-gradient-to-r from-violet-600 to-indigo-600' : 'bg-white/10'}`}>
                <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-300 ${showFinished ? 'left-[18px]' : 'left-0.5'}`} />
              </div>
            </div>
          </div>

          {noFinishedTasks ? (
            <div className="relative mt-4 sm:mt-6 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-900/40 via-indigo-900/30 to-[#0a0a0f] rounded-2xl" />
              <div className="absolute inset-0 rounded-2xl" style={{
                background: `radial-gradient(ellipse 60% 60% at 50% 0%, rgba(139,92,246,0.15) 0%, transparent 70%)`
              }} />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
              <div className="relative flex flex-col items-center justify-center py-10 xs:py-12 sm:py-14 lg:py-16 px-4 sm:px-6 text-center">
                <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center mb-4 sm:mb-5 shadow-[0_0_30px_rgba(139,92,246,0.2)]">
                  <span className="text-xl xs:text-2xl sm:text-3xl">🎯</span>
                </div>
                <h3 className="text-base xs:text-lg sm:text-xl font-extrabold tracking-tight bg-gradient-to-br from-white to-violet-300 bg-clip-text text-transparent mb-2">
                  No tasks completed yet
                </h3>
                <p className="text-[#6b6b8a] text-xs sm:text-sm font-light max-w-xs leading-relaxed">
                  Check off a task to see it appear here. Your finished work deserves to be celebrated!
                </p>
                <div className="mt-4 sm:mt-6 flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-3 xs:px-4 py-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                  <span className="text-violet-400 text-xs font-semibold tracking-wide">0 of {todos.length} done</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2 xs:gap-2.5">
              {filteredTodos.length === 0 ? (
                <div className="text-center py-10 sm:py-14 lg:py-16 text-[#3a3a5c]">
                  <div className="text-3xl sm:text-4xl mb-3">✦</div>
                  <p className="text-xs sm:text-sm font-light">All clear — add a task above to get started</p>
                </div>
              ) : (
                filteredTodos.map(t => (
                  <div
                    key={t.id}
                    onDoubleClick={() => handleDoubleClick(t.id)}
                    title="Double-click to toggle complete"
                    className="group bg-white/[0.04] border border-white/[0.07] rounded-xl sm:rounded-2xl px-3 xs:px-4 sm:px-5 py-3 xs:py-3.5 sm:py-4 flex items-center gap-2 xs:gap-3 sm:gap-4 hover:bg-white/[0.07] hover:border-white/[0.12] transition-all duration-200 cursor-pointer select-none"
                  >
                    <div
                      onClick={e => { e.stopPropagation(); handleCheckbox(t.id) }}
                      className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 cursor-pointer transition-all duration-200
                        ${t.isCompleted
                          ? 'bg-gradient-to-br from-violet-600 to-indigo-600 border-transparent'
                          : 'border-violet-500/50 bg-transparent hover:border-violet-400'
                        }`}
                    >
                      {t.isCompleted && <span className="text-white text-xs font-bold">✓</span>}
                    </div>

                    <span className={`flex-1 text-xs sm:text-sm leading-relaxed transition-all duration-200 break-words min-w-0
                      ${t.isCompleted ? 'line-through text-[#3a3a5c]' : 'text-[#d4d4e8]'}`}>
                      {t.text}
                    </span>

                    <div className="flex gap-1 xs:gap-1.5 sm:gap-2 flex-shrink-0 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        onClick={e => { e.stopPropagation(); handleEdit(t.id) }}
                        className="bg-white/[0.07] border border-white/10 text-[#9999bb] text-xs font-bold px-2 xs:px-2.5 sm:px-3 py-1 xs:py-1.5 rounded-lg hover:bg-violet-500/20 hover:border-violet-500/40 hover:text-violet-400 transition-all duration-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={e => { e.stopPropagation(); handleDelete(t.id) }}
                        className="bg-white/[0.07] border border-white/10 text-[#9999bb] text-xs font-bold px-2 xs:px-2.5 sm:px-3 py-1 xs:py-1.5 rounded-lg hover:bg-red-500/15 hover:border-red-500/30 hover:text-red-400 transition-all duration-200"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default App