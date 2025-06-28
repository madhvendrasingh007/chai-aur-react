import { useState } from 'react'

function App() {
  const [bgColor, setBgColor] = useState('cyan')

  return (
    <div className='w-full h-screen duration-200'style={{ backgroundColor: bgColor }}>
      <div className='fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2'>
        <div className='flex flex-wrap justify-center gap-3 shadow-lg bg-amber-50 rounded-3xl px-3 py-2'>
          <button 
            onClick={() => setBgColor('red')}
            className='outline-none px-4 py-1 rounded-full text-white shadow-lg'
            style={{backgroundColor: 'red'}}>
              Red
          </button>
          <button 
            onClick={() => setBgColor('green')}
            className='outline-none px-4 py-1 rounded-full text-white shadow-lg'
            style={{backgroundColor: 'green'}}>
              Green
          </button>
          <button 
            onClick={() => setBgColor('skyblue')}
            className='outline-none px-4 py-1 rounded-full text-white shadow-lg'
            style={{backgroundColor: 'skyblue'}}>
              Skyblue
          </button>
          <button 
            onClick={() => setBgColor('magenta')}
            className='outline-none px-4 py-1 rounded-full text-white shadow-lg'
            style={{backgroundColor: 'magenta'}}>
              Magenta
          </button>
          <button 
            onClick={() => setBgColor('green')}
            className='outline-none px-4 py-1 rounded-full text-white shadow-lg'
            style={{backgroundColor: 'green'}}>
              Green
          </button>
          <button 
            onClick={() => setBgColor('cyan')}
            className='outline-none px-4 py-1 rounded-full text-black shadow-lg'
            style={{backgroundColor: 'cyan'}}>
              Cyan
          </button>
          <button 
            onClick={() => setBgColor('purple')}
            className='outline-none px-4 py-1 rounded-full text-white shadow-lg'
            style={{backgroundColor: 'purple'}}>
              Purple
          </button>
          <button 
            onClick={() => setBgColor('orange')}
            className='outline-none px-4 py-1 rounded-full text-white shadow-lg'
            style={{backgroundColor: 'orange'}}>
              Orange
          </button>
          <button 
            onClick={() => setBgColor('yellow')}
            className='outline-none px-4 py-1 rounded-full text-black shadow-lg'
            style={{backgroundColor: 'yellow'}}>
              Yellow
          </button>
          <button 
            onClick={() => setBgColor('black')}
            className='outline-none px-4 py-1 rounded-full text-white shadow-lg'
            style={{backgroundColor: 'black'}}>
              Black
          </button>
          <button 
            onClick={() => setBgColor('white')}
            className='outline-none px-4 py-1 rounded-full text-black shadow-lg'
            style={{backgroundColor: 'white'}}>
              White
          </button>
          <button 
            onClick={() => setBgColor('gray')}
            className='outline-none px-4 py-1 rounded-full text-white shadow-lg'
            style={{backgroundColor: 'gray'}}>
              Gray
          </button>
          <button 
            onClick={() => setBgColor('pink')}
            className='outline-none px-4 py-1 rounded-full text-white shadow-lg'
            style={{backgroundColor: 'pink'}}>
              Pink
          </button>
          <button 
            onClick={() => setBgColor('brown')}
            className='outline-none px-4 py-1 rounded-full text-white shadow-lg'
            style={{backgroundColor: 'brown'}}>
              Brown
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
