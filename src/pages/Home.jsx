import { useState, useMemo } from 'react'
import cardsData from '../data/cardsData.json'
import { filterByFDAmount, sortByFD } from '../utils/filterHelpers'
import CardItem from '../components/cards/CardItem'

function Home() {
  const [filterType, setFilterType] = useState('minimum')
  const [fdAmount, setFdAmount] = useState(0)
  const [tempFdAmount, setTempFdAmount] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [showEnterIcon, setShowEnterIcon] = useState(false)

  const toggleFilterType = () => {
    setFilterType(prev => prev === 'minimum' ? 'maximum' : 'minimum')
  }

  const handleFdAmountChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '')
    setTempFdAmount(value)
    setShowEnterIcon(value !== '')
  }

  const handleFdAmountKeyDown = (e) => {
    if (e.key === 'Enter') {
      const value = tempFdAmount === '' ? 0 : Number(tempFdAmount)
      setFdAmount(value)
      setShowEnterIcon(false)
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN').format(amount)
  }

  // Filter and search logic
  const filteredCards = useMemo(() => {
    let result = [...cardsData]

    // Apply FD filter
    if (fdAmount > 0) {
      result = filterByFDAmount(result, fdAmount, filterType === 'minimum')
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(card =>
        card.bankName.toLowerCase().includes(query) ||
        card.cardName.toLowerCase().includes(query) ||
        card.network.some(n => n.toLowerCase().includes(query))
      )
    }

    // Sort by FD amount
    return sortByFD(result, true)
  }, [fdAmount, filterType, searchQuery])

  return (
    <div className="min-h-screen bg-white animate-fadeIn">
      <div className="max-w-[650px] mx-auto px-4 py-8">

        {/* Header Section */}
        <div className=" text-center mb-10">
          <img src="images\logo\secards-sq.png" 
               alt="SeCards" 
               className="size-16 mx-auto mb-2 object-contain rounded-2xl" />

          <div className="flex gap-1 flex-col items-center"> 
            <h1 className="text-5xl sm:text-4xl font-bold text-[#2966c2] font-mono -mb-1">
              SeCards
            </h1>

            {/* <div className="w-32 h-px bg-gray-300 mx-auto mb-3"></div> */}
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-[#D9D9D9] to-[#555555] text-md sm:text-md font-mono mb-8">
              Directory of Secured cards in India
            </p>

          </div>
          <div className="w-[80px] max-w-2xl h-[4px] bg-gray-200 mx-auto"></div>

        </div>

        {/* Conversational Filter Section */}
        <div className="mb-8">
          <div className="flex flex-wrap font-sans items-baseline gap-x-2 gap-y-2 text-3xl sm:text-3xl text-gray-400">
            <span className="font-semibold">I want a secured card with</span>
          </div>
          <div className="flex flex-wrap font-sans items-baseline gap-x-2 gap-y-2 text-3xl sm:text-3xl text-gray-400 mt-2">
            {/* Filter Type Toggle */}
            <button
              onClick={toggleFilterType}
              className="relative inline-block font-semibold text-black hover:text-gray-700 transition-colors focus:outline-none border-b-2 border-black pb-0.5"
            >
              {filterType}
            </button>
          </div>
          <div className="flex flex-wrap font-sans items-baseline gap-x-2 gap-y-2 text-3xl sm:text-3xl text-gray-400 mt-2">
            <span className="font-semibold">FD amount of</span>
          </div>
          <div className="flex flex-wrap font-sans items-center gap-x-2 gap-y-2 text-3xl sm:text-3xl text-gray-400 mt-2">
            {/* FD Amount Input */}
            <span className="text-black font-semibold">₹</span>
            <input
              type="text"
              value={tempFdAmount === '' ? (fdAmount === 0 ? '' : formatCurrency(fdAmount)) : formatCurrency(Number(tempFdAmount))}
              onChange={handleFdAmountChange}
              onKeyDown={handleFdAmountKeyDown}
              placeholder="0"
              className="inline-block w-28 sm:w-32 font-semibold text-black bg-transparent border-b-2 border-black focus:outline-none hover:text-gray-700 transition-colors pb-0.5 px-1 placeholder-gray-300"
            />
            {/* Enter Icon */}
            <span className={`text-sm text-gray-400 flex items-center gap-1 transition-all duration-300 ${showEnterIcon ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 pointer-events-none'}`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs">Enter</span>
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8 w-full">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-4 w-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border border-transparent focus:outline-none focus:ring-1 focus:ring-gray-300 focus:bg-white transition-all placeholder-gray-400 text-sm"
            />
          </div>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-2 gap-4">
          {filteredCards.map((card, index) => (
            <div
              key={card.id}
              className="animate-fadeInUp"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CardItem card={card} />
            </div>
          ))}
        </div>

        {filteredCards.length === 0 && (
          <div className="text-center text-gray-400 py-12">
            <p>No cards found matching your criteria</p>
          </div>
        )}

      </div>
    </div>
  )
}

export default Home
