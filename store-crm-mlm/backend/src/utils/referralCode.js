const generateReferralCode = () => {

    const random =
        Math.random()
            .toString(36)
            .substring(2, 8)
            .toUpperCase();

    return `CRM${random}`;
};

module.exports = generateReferralCode;