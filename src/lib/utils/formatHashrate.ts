interface HashRate {
	denomination: string;
	rate: string;
	raw?: number;
}

export function formatHashrate(hashrate: number): HashRate {
	let hashRateObject: HashRate = {
		denomination: '',
		rate: '0'
	};

	if (hashrate < 0) {
		throw new Error('Hashrate must be higher than 0');
	}

	if (hashrate === 0) {
		return hashRateObject;
	}

	const thousand = 1000;
	const sizes = ['Hashes', 'KH', 'MH', 'GH', 'TH', 'PH', 'EH', 'ZH', 'YH'];
	const thousandth = Math.floor(Math.log(hashrate) / Math.log(thousand));
	const reducedAmount = hashrate / Math.pow(thousand, thousandth);

	hashRateObject.rate = reducedAmount.toFixed(2);
	hashRateObject.denomination = sizes[thousandth] + '/s';
	hashRateObject.raw = hashrate;

	return hashRateObject;
}
