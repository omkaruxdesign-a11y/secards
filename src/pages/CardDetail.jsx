import { useParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import cardsData from '../data/cardsData.json'
import { getCardById } from '../utils/filterHelpers'
import { CaretLeft } from '@phosphor-icons/react'

function CardDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const card = getCardById(cardsData, id)

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  // If card not found, redirect to home
  if (!card) {
    navigate('/')
    return null
  }

  // Get bank logo color - same logic as CardItem
  const getBankLogoColor = (bankName) => {
    if (bankName.includes('IDFC')) return 'text-[#D32F2F]'
    if (bankName.includes('KOTAK')) return 'text-[#E91E63]'
    if (bankName.includes('HDFC')) return 'text-[#1565C0]'
    if (bankName.includes('AXIS')) return 'text-[#7B1FA2]'
    if (bankName.includes('SBI')) return 'text-[#1976D2]'
    return 'text-gray-800'
  }

  // Get background color based on card - using vibrant accent colors
  const getBackgroundColor = (card) => {
    const cardId = card.id
    const bankName = card.bankName

    // Card-specific accent colors matching card designs
    if (cardId === 'supercard-utkarsh') return 'bg-gradient-to-br from-purple-50 to-pink-50'
    if (cardId === 'zet-sbm') return 'bg-gradient-to-br from-blue-50 to-cyan-50'
    if (cardId === 'fi-federal') return 'bg-gradient-to-br from-emerald-50 to-teal-50'
    if (cardId === 'kotak-dreamdifferent') return 'bg-gradient-to-br from-pink-50 to-rose-50'
    if (cardId === 'phonepe-wish') return 'bg-gradient-to-br from-purple-50 to-indigo-50'
    if (cardId === 'idfc-wow') return 'bg-gradient-to-br from-red-50 to-orange-50'
    if (cardId === 'idfc-earn') return 'bg-gradient-to-br from-amber-50 to-yellow-50'
    if (cardId === 'kreditpe-sbm') return 'bg-gradient-to-br from-violet-50 to-purple-50'
    if (cardId === 'sbi-unnati') return 'bg-gradient-to-br from-blue-50 to-indigo-50'
    if (cardId === 'ssfb-rupay') return 'bg-gradient-to-br from-sky-50 to-blue-50'
    if (cardId === 'axis-myzone') return 'bg-gradient-to-br from-purple-50 to-fuchsia-50'
    if (cardId === 'mobikwik-first') return 'bg-gradient-to-br from-red-50 to-pink-50'
    if (cardId === 'novio-credilio') return 'bg-gradient-to-br from-slate-50 to-gray-100'

    // Bank-based fallbacks
    if (bankName.includes('IDFC')) return 'bg-gradient-to-br from-red-50 to-orange-50'
    if (bankName.includes('KOTAK')) return 'bg-gradient-to-br from-pink-50 to-rose-50'
    if (bankName.includes('HDFC')) return 'bg-gradient-to-br from-orange-50 to-amber-50'
    if (bankName.includes('AXIS')) return 'bg-gradient-to-br from-purple-50 to-violet-50'
    if (bankName.includes('SBI')) return 'bg-gradient-to-br from-blue-50 to-indigo-50'
    if (bankName.includes('Federal')) return 'bg-gradient-to-br from-emerald-50 to-teal-50'

    return 'bg-gradient-to-br from-gray-50 to-slate-100'
  }

  const formatCurrency = (amount) => {
    return `₹${new Intl.NumberFormat('en-IN').format(amount)}`
  }

  const handleBack = () => {
    navigate('/')
  }

  const handleVisitWebsite = () => {
    window.open(card.websiteUrl, '_blank', 'noopener,noreferrer')
  }

  // Helper function to highlight USPs (cashbacks, percentages, amounts, fees)
  const highlightUSPs = (text) => {
    // Pattern matches: percentages, currency amounts, "free", "no fee", etc.
    const pattern = /(\d+\.?\d*%|\₹[\d,]+|FD from ₹[\d,]+|FD of ₹[\d,]+|FD ₹[\d,]+|lifetime[- ]free|joining fee|annual fee|no fee|cashback|instant|100% approval|interest on FD|up to [\d.]+% interest)/gi

    const parts = text.split(pattern)

    return parts.map((part, index) => {
      if (pattern.test(part)) {
        return <span key={index} className="font-semibold">{part}</span>
      }
      return part
    })
  }

  return (
    <div className="min-h-screen bg-white pb-24 animate-fadeIn">
      <div className="max-w-[650px] mx-auto px-4 py-6">

        {/* Back Button */}
        <button
          onClick={handleBack}
          className="flex items-center gap-1 text-gray-700 hover:text-gray-900 mb-6 font-sans text-sm"
        >
          
          <span className="text-sm font-mono font-medium hover:text-gray-900 text-gray-700 underline">Back</span>
        </button>

        {/* Bank Name with Logo - Co-branded or Regular */}
        {card.isCobranded ? (
          <div className="flex items-center gap-2 mb-2">
            {/* Stacked Icons for Co-branded */}
            <div className='inline-flex'>
              <img
                src={card.bankIcon}
                alt={`${card.bankName} icon`}
                className="w-6 h-6 object-contain rounded-md"
              />
              {/* Partner Icon */}
              <img
                src={card.cobrandPartnerIcon}
                alt={`${card.cobrandPartner} icon`}
                className="w-6 h-6 -ml-1 object-contain rounded-md"
              />
            </div>
            {/* Co-branded Text */}
            <span className="text-xs font-mono font-medium text-gray-700 uppercase">
              {card.bankName} X {card.cobrandPartner}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2 mb-2">
            {card.bankIcon ? (
              <img
                src={card.bankIcon}
                alt={`${card.bankName} icon`}
                className="w-6 h-6 object-contain"
              />
            ) : (
              <div className={`w-6 h-6 ${getBankLogoColor(card.bankName)} flex items-center justify-center`}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <rect width="20" height="20" />
                </svg>
              </div>
            )}
            <span className="text-xs font-mono font-medium text-gray-700 uppercase">
              {card.bankName}
            </span>
          </div>
        )}

        {/* Card Name */}
        <h1 className="text-2xl font-semibold text-gray-900 mb-6 font-sans">
          {card.cardName}
        </h1>

        {/* Card Image */}
        <div className={`${getBackgroundColor(card)} w-full flex items-center justify-center p-8 mb-6`}>
          {card.cardImage ? (
            (card.cardOrientation || 'horizontal') === 'horizontal' ? (
              // Horizontal/Landscape card
              <img
                src={card.cardImage}
                alt={card.cardName}
                className="w-full max-w-[280px] h-auto object-contain rounded-lg"
              />
            ) : (
              // Vertical/Portrait card
              <img
                src={card.cardImage}
                alt={card.cardName}
                className="h-[280px] w-auto object-contain rounded-lg"
              />
            )
          ) : (
            // Fallback placeholder if no image
            <div className="w-full max-w-[280px] aspect-[1.586/1] bg-gradient-to-br from-gray-700 to-gray-900 shadow-xl flex items-center justify-center">
              <span className="text-white text-sm font-mono opacity-50">Card Image</span>
            </div>
          )}
        </div>

        {/* Card Details Grid - 3x2 Layout */}
        <div className="mb-8 bg-white border border-gray-200">
          {/* Row 1 - 3 Columns */}
          <div className="grid grid-cols-3">
            {/* Min FD */}
            <div className="flex flex-col items-start p-4 border-r border-b border-gray-200">
              <span className="text-base font-semibold text-gray-900">
                {formatCurrency(card.minFD)}
              </span>
              <span className="text-xs text-gray-400">Min. FD</span>
            </div>

            {/* Joining Fee */}
            <div className="flex flex-col items-start p-4 border-r border-b border-gray-200">
              <span className={`text-base font-semibold ${card.joiningFee === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                {card.joiningFee === 0 ? 'None' : formatCurrency(card.joiningFee)}
              </span>
              <span className="text-xs text-gray-400">Joining Fee</span>
            </div>

            {/* Credit Limit */}
            <div className="flex flex-col items-start p-4 border-b border-gray-200">
              <span className={`text-base font-semibold ${card.creditLimit >= 90 ? 'text-green-600' : 'text-gray-900'}`}>
                {card.creditLimit}%
              </span>
              <span className="text-xs text-gray-400">Credit Limit</span>
            </div>
          </div>

          {/* Row 2 - 2 Columns */}
          <div className="grid grid-cols-2">
            {/* Network */}
            <div className="flex flex-col items-start p-4 border-r border-gray-200">
              <div className="flex gap-1 mb-1">
                {card.network.map((net, index) => (
                  <span key={index} className="text-base font-semibold text-gray-900">
                    {net}{index < card.network.length - 1 ? ',' : ''}
                  </span>
                ))}
              </div>
              <span className="text-xs text-gray-400">Network</span>
            </div>

            {/* Annual Fee */}
            <div className="flex flex-col items-start p-4">
              <span className={`text-base font-semibold ${card.annualFee === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                {card.annualFee === 0 ? 'None' : formatCurrency(card.annualFee)}
              </span>
              <span className="text-xs text-gray-400">Annual Fee</span>
            </div>
          </div>
        </div>

        {/* BEST FOR YOU IF Section */}
        <div className="mb-6">
          <h2 className="text-sm font-mono font-medium text-gray-400 mb-3">
            BEST FOR YOU IF
          </h2>
          <ul className="space-y-2">
            {card.bestForYou.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-900 font-sans">
                <span className="text-gray-900 mt-0.5">•</span>
                <span>{highlightUSPs(item)}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* HIGHLIGHTS Section */}
        <div className="mb-8">
          <h2 className="text-sm font-mono font-medium text-gray-400 mb-3">
            HIGHLIGHTS
          </h2>
          <ul className="space-y-2">
            {card.highlights.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-900 font-sans">
                <span className="text-gray-900 mt-0.5">•</span>
                <span>{highlightUSPs(item)}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* VISIT WEBSITE Button - Sticky at Bottom */}
      <div className="fixed bottom-0 left-0 right-0 p-4 pointer-events-none">
      {/* Progressive blur layer */}
      <div 
        className="absolute inset-0 backdrop-blur-xl"
        style={{
          WebkitMaskImage: 'linear-gradient(to top, black 40%, transparent 100%)',
          maskImage: 'linear-gradient(to top, black 40%, transparent 100%)'
        }}
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
      
      {/* Button container - needs pointer events */}
      <div className="relative max-w-[650px] mx-auto pointer-events-auto">
        <button
          onClick={handleVisitWebsite}
          className="w-full bg-[#2966c2] text-white py-3 px-4 font-mono text-sm font-medium hover:bg-[#1d4ed8] transition-colors flex items-center justify-center gap-2"
        >
          VISIT WEBSITE
        </button>
      </div>
    </div>
    </div>
  )
}

export default CardDetail
