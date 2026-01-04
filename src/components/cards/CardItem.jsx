import { useNavigate } from 'react-router-dom'

function CardItem({ card }) {
  const navigate = useNavigate()

  // Get background color based on card - using vibrant accent colors
  const getBackgroundColor = (card) => {
    const cardId = card.id
    const bankName = card.bankName

    // Card-specific accent colors matching card designs
    if (cardId === 'supercard-utkarsh') return 'bg-gradient-to-br from-blue-50 to-blue-50'
    if (cardId === 'zet-sbm') return 'bg-gradient-to-br from-purple-50 to-cyan-50'
    if (cardId === 'fi-federal') return 'bg-gradient-to-br from-emerald-50 to-teal-50'
    if (cardId === 'kotak-dreamdifferent') return 'bg-gradient-to-br from-blue-50 to-rose-50'
    if (cardId === 'phonepe-wish') return 'bg-gradient-to-br from-burgundy-50 to-orange-50'
    if (cardId === 'idfc-wow') return 'bg-gradient-to-br from-red-50 to-orange-50'
    if (cardId === 'idfc-earn') return 'bg-gradient-to-br from-red-50 to-orange-50'
    if (cardId === 'kreditpe-sbm') return 'bg-gradient-to-br from-blue-50 to-purple-50'
    if (cardId === 'sbi-unnati') return 'bg-gradient-to-br from-blue-50 to-indigo-50'
    if (cardId === 'ssfb-rupay') return 'bg-gradient-to-br from-sky-50 to-blue-50'
    if (cardId === 'axis-myzone') return 'bg-gradient-to-br from-crimson-50 to-crimson-50'
    if (cardId === 'mobikwik-first') return 'bg-gradient-to-br from-blue-50 to-blue-50'
    if (cardId === 'novio-credilio') return 'bg-gradient-to-br from-blue-50 to-gray-100'

    // Bank-based fallbacks
    if (bankName.includes('IDFC')) return 'bg-gradient-to-br from-red-50 to-orange-50'
    if (bankName.includes('KOTAK')) return 'bg-gradient-to-br from-pink-50 to-rose-50'
    if (bankName.includes('HDFC')) return 'bg-gradient-to-br from-orange-50 to-amber-50'
    if (bankName.includes('AXIS')) return 'bg-gradient-to-br from-purple-50 to-violet-50'
    if (bankName.includes('SBI')) return 'bg-gradient-to-br from-blue-50 to-indigo-50'
    if (bankName.includes('Federal')) return 'bg-gradient-to-br from-emerald-50 to-teal-50'

    return 'bg-gradient-to-br from-gray-50 to-slate-100'
  }

  // Get bank logo color
  const getBankLogoColor = (bankName) => {
    if (bankName.includes('IDFC')) return 'text-[#D32F2F]' // Red
    if (bankName.includes('KOTAK')) return 'text-[#E91E63]' // Pink/Magenta
    if (bankName.includes('HDFC')) return 'text-[#1565C0]' // Blue
    if (bankName.includes('AXIS')) return 'text-[#7B1FA2]' // Purple
    if (bankName.includes('SBI')) return 'text-[#1976D2]' // Blue
    if (bankName.includes('SBM')) return 'text-[#FF6600]' // Orange
    return 'text-gray-800'
  }

  const formatCurrency = (amount) => {
    return `₹${new Intl.NumberFormat('en-IN').format(amount)}`
  }

  const handleClick = () => {
    navigate(`/card/${card.id}`)
  }

  // Get card orientation (default to horizontal if not specified)
  const orientation = card.cardOrientation || 'horizontal'

  return (
    <div
      onClick={handleClick}
      className="w-full overflow-hidden cursor-pointer transition-all duration-200 hover:border-gray-400 hover:-translate-y-1 hover:shadow-md border border-gray-200"
    >
      {/* Card Image Section - Square container (CRITICAL: Always square 1:1 ratio) */}
      <div className={`${getBackgroundColor(card)} aspect-square w-full flex items-center justify-center p-4`}>
        {/* Card image with orientation-based sizing */}
        {card.cardImage ? (
          orientation === 'horizontal' ? (
            // Horizontal/Landscape card - fits width, centered horizontally
            <img
              src={card.cardImage}
              alt={card.cardName}
              className="w-full h-auto object-contain rounded-lg"
            />
          ) : (
            // Vertical/Portrait card - fits height, centered vertically
            <img
              src={card.cardImage}
              alt={card.cardName}
              className="h-full w-auto object-contain rounded-lg"
            />
          )
        ) : (
          // Fallback placeholder if no image
          <div className="w-full aspect-[1.586/1] bg-gradient-to-br from-gray-700 to-gray-900 shadow-xl flex items-center justify-center">
            <span className="text-white text-xs font-mono opacity-50">Card Image</span>
          </div>
        )}
      </div>

      {/* Card Info Section */}
      <div className="bg-white">
        {/* Bank Name with Logo - Co-branded or Regular */}
        {card.isCobranded ? (
          <div className="p-2 flex gap-2 items-center border-b border-gray-200">
            {/* Bank Icon */}
            <div className='inline-flex'>
              <img
                src={card.bankIcon}
                alt={`${card.bankName} icon`}
                className="w-5 h-5 object-contain rounded-md"
              />
              {/* Partner Icon */}
              <img
                src={card.cobrandPartnerIcon}
                alt={`${card.cobrandPartner} icon`}
                className="w-5 h-5 -ml-1 object-contain rounded-md"
              />
            </div>
            {/* Co-branded Text */}
            <span className="text-xs uppercase truncate font-mono text-gray-700">
              <span className="font">{card.bankName} X {card.cobrandPartner}</span>
            </span>
          </div>
        ) : (
          <div className="p-2 flex items-center gap-2 border-b border-gray-200">
            {card.bankIcon ? (
              <img
                src={card.bankIcon}
                alt={`${card.bankName} icon`}
                className="w-5 h-5 object-contain rounded-md"
              />
            ) : (
              <div className={`w-5 h-5 ${getBankLogoColor(card.bankName)} flex items-center  justify-center`}>
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <rect width="20" height="20" />
                </svg>
              </div>
            )}
            <span className="text-xs uppercase truncate font-mono font-medium text-gray-700">
              {card.bankName}
            </span>
          </div>
        )}

        {/* Card Name */}
        <h3 className="text-base font-semibold text-gray-900 p-2 border-b truncate border-gray-200 font-sans">
          {card.cardName}
        </h3>

        {/* Card Details Grid */}
        <div className="flex flex-col sm:flex-row sm:justify-between p-2">
          {/* Min FD */}
          <div className="flex flex-col items-start mb-1">
            <span className="text-sm font-semibold text-gray-900">
              {formatCurrency(card.minFD)}
            </span>
            <span className="text-xs text-gray-400">Min. FD</span>

          </div>

          {/* Joining Fee */}
          <div className="flex flex-col items-start mb-1">

            <span className={`text-sm font-semibold ${card.joiningFee === 0 ? 'text-green-600' : 'text-gray-900'}`}>
              {card.joiningFee === 0 ? 'None' : formatCurrency(card.joiningFee)}
            </span>
            <span className="text-xs text-gray-400">Joining Fee</span>
          </div>

          {/* Credit Limit */}
          <div className="flex flex-col items-start mb-1">

            <span className={`text-sm font-semibold ${card.creditLimit >= 90 ? 'text-green-600' : 'text-gray-900'}`}>
              {card.creditLimit}%
            </span>
            <span className="text-xs text-gray-400">Credit Limit</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardItem
