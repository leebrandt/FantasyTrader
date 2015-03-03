var fakeData = {

	exchanges: [{
					id: 1,
					logo: '/path/to/image/logo.png',
					name: 'Exchange One',
					owner: 'Neil Young',
					isMember: true,
					startDate: new Date('1/2/15'),
					durationWeeks: 10,
					startingBudget: 100000,
					MaxPortfolioSize: 20,
					portfolioDraftType:'Exclusive Ownership',
					portfolio:{
						value: 100252.20,
						change: -41.20,
						changePct: 0.04,
						currentPlace: '3rd',
						trades:[2,5,3],
						stocks:[
							{
								symbol: 'AAPL',
								company: 'Apple, Inc.',
								shares: 15,
								change: -.12,
								price: 127.20
							},
							{
								symbol: 'MSFT',
								company: 'Microsoft, Inc.',
								shares: 50,
								change: 1.5,
								price: 43.28
							}
						]
					}
				},{
					id: 2,
					logo: '/path/to/image/logo.png',
					name: 'Exchange Two',
					owner: 'Graham Zusi',
					isMember: true,
					startDate: new Date('2/20/15'),
					durationWeeks: 6,
					startingBudget: 100000,
					MaxPortfolioSize: 20,
					portfolioDraftType:'Exclusive Ownership',
					portfolio:{
						value: 81494.90,
						change: 23,
						changePct: 0.02,
						currentPlace: '4th',
						cash: 2130.77,
						trades:[],
						stocks:[
							{
								symbol: 'AAPL',
								company: 'Apple, Inc.',
								shares: 120,
								price: 127.20
							}
						]
					}
				},{
					id: 3,
					logo: '/path/to/image/logo.png',
					name: 'Exchange Three',
					owner: 'Peter Quill',
					isMember: false,
					startDate: new Date('1/15/15'),
					durationWeeks: 8,
					startingBudget: 100000,
					MaxPortfolioSize: 20,
					portfolioDraftType:'Exclusive Ownership',
					leader:{
						name: 'Richard Branson',
						changePct: 8.324
					}
				},{
					id: 4,
					logo: '/path/to/image/logo.png',
					name: 'Exchange Four',
					owner: 'Peregrin Took',
					isMember: false,
					startDate: new Date('2/1/15'),
					durationWeeks: 4,
					startingBudget: 100000,
					MaxPortfolioSize: 20,
					portfolioDraftType:'Exclusive Ownership',		
					leader:{
						name: 'Hugo Boss',
						changePct: -.032
					}
				}]
};