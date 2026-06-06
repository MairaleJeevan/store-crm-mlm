const supabase =
    require('../config/supabase');

const generateIncentive = async (
    saleId,
    userId,
    saleAmount
) => {

    try {

        console.log('=== INCENTIVE START ===');

        const { data: config, error: configError } =
            await supabase
                .from('incentives')
                .select('*')
                .eq('role_name', 'ADMIN')
                .single();

        console.log('CONFIG:', config);
        console.log('CONFIG ERROR:', configError);

        if (!config) {
            return;
        }

        const incentive =
            (Number(saleAmount) *
                Number(config.percentage)) / 100;

        console.log(
            'INCENTIVE:',
            incentive
        );

        const {
            data,
            error
        } = await supabase
            .from('incentive_transactions')
            .insert([
                {
                    user_id: userId,
                    sale_id: saleId,
                    incentive_amount:
                        incentive,
                    incentive_type:
                        'SALE'
                }
            ])
            .select();

        console.log(
            'INSERT DATA:',
            data
        );

        console.log(
            'INSERT ERROR:',
            error
        );

        console.log('=== INCENTIVE END ===');

    } catch (error) {

        console.log(
            'INCENTIVE ERROR:',
            error
        );
    }
};

module.exports = {
    generateIncentive
};