const items = [
    {
        id: '0000000001',
        title: 'First List',
        todos:['First todo of first list!'],
        completed: true,
        created: '2020/01/01'
    },
    {
        id: '0000000002',
        title: 'Second List',
        todos:['First todo of second list!'],
        completed: false,
        created: '2020/01/02'
    },
    {
        id: '0000000003',
        title: 'Third List',
        todos:['First todo of third list!'],
        completed: true,
        created: '2020/01/03'
    }
];
const getAllItems = () => items;
export default { getAllItems };
