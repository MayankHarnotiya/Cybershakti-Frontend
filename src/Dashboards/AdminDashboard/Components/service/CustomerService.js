
export const CustomerService = {
    getCustomersMedium: () => {
        return Promise.resolve([
            {
                id: 1,
                name: 'Alice Johnson',
                country: { name: 'USA', code: 'us' },
                representative: { name: 'Amy Elsner', image: 'amyelsner.png' },
                status: 'qualified',
                verified: true,
                date: '2023-08-10'
            },
            {
                id: 2,
                name: 'Bob Smith',
                country: { name: 'Germany', code: 'de' },
                representative: { name: 'Anna Fali', image: 'annafali.png' },
                status: 'new',
                verified: false,
                date: '2023-07-25'
            },
            {
                id: 3,
                name: 'Charlie Brown',
                country: { name: 'India', code: 'in' },
                representative: { name: 'XuXue Feng', image: 'xuxuefeng.png' },
                status: 'negotiation',
                verified: true,
                date: '2023-06-12'
            }
        ]);
    }
};
