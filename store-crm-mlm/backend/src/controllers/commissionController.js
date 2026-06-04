const supabase = require('../config/supabase');

// Generate MLM Commissions
const generateCommission = async (
    saleId,
    sellerUserId,
    saleAmount
) => {

    try {

        console.log('======================');
        console.log('COMMISSION START');
        console.log('Sale ID:', saleId);
        console.log('Seller ID:', sellerUserId);
        console.log('Sale Amount:', saleAmount);
        console.log('======================');

        let currentUserId = sellerUserId;

        for (let level = 1; level <= 3; level++) {

            console.log(
                `Checking Level ${level} for User ${currentUserId}`
            );

            const {
                data: user,
                error: userError
            } = await supabase
                .from('users')
                .select('*')
                .eq('id', currentUserId)
                .single();

            console.log('User Record:', user);
            console.log('User Error:', userError);

            if (!user || !user.sponsor_id) {

                console.log(
                    'No Sponsor Found. Commission Chain Stopped.'
                );

                break;
            }

            const sponsorId = user.sponsor_id;

            console.log(
                'Sponsor Found:',
                sponsorId
            );

            const {
                data: rate,
                error: rateError
            } = await supabase
                .from('mlm_commission_rates')
                .select('*')
                .eq('level_no', level)
                .single();

            console.log('Commission Rate:', rate);
            console.log('Rate Error:', rateError);

            if (!rate) {

                console.log(
                    `No Rate Configured For Level ${level}`
                );

                continue;
            }

            const commissionAmount =
                (Number(saleAmount) *
                    Number(rate.percentage)) / 100;

            console.log({
                saleId,
                sponsorId,
                sellerUserId,
                level,
                percentage: rate.percentage,
                commissionAmount
            });

            const {
                data: commissionData,
                error: commissionError
            } = await supabase
                .from('commissions')
                .insert([
                    {
                        sale_id: saleId,
                        beneficiary_user_id:
                            sponsorId,
                        source_user_id:
                            sellerUserId,
                        commission_level:
                            level,
                        commission_percentage:
                            rate.percentage,
                        commission_amount:
                            commissionAmount
                    }
                ])
                .select();

            console.log(
                'Commission Insert Result:',
                commissionData
            );

            console.log(
                'Commission Insert Error:',
                commissionError
            );

            currentUserId = sponsorId;
        }

        console.log('COMMISSION END');

    } catch (error) {

        console.error(
            'Commission Error:',
            error.message
        );
    }
};

// Get My Commissions
const getMyCommissions = async (
    req,
    res
) => {

    try {

        const {
            data,
            error
        } = await supabase
            .from('commissions')
            .select('*')
            .eq(
                'beneficiary_user_id',
                req.user.id
            )
            .order(
                'created_at',
                { ascending: false }
            );

        if (error) throw error;

        const totalCommission =
            data.reduce(
                (sum, row) =>
                    sum +
                    Number(
                        row.commission_amount
                    ),
                0
            );

        return res.json({
            success: true,
            totalCommission,
            count: data.length,
            data
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    generateCommission,
    getMyCommissions
};