// const { card } = require("components/Redux/CardSlice");

// const STATbJI = [
//   {
//     id: 1,
//     textName: 'breaking news1',
//     text: 'lorem ipsum1',
//   },
//   {
//     id: 2,
//     textName: 'breaking news2',
//     text: 'lorem ipsum2',
//   },
//   {
//     id: 3,
//     textName: 'breaking news3',
//     text: 'lorem ipsum3',
//   },
// ];

// const CardList = React.createClass({
//     getInitialState() {
//       return {
//        card: card,
//         count: 2,
//       }
//     }
//     addnews() {
//       const { novosti, count } = this.state;
//       if (count <== novosti.length - 2) {
//         const newCount = count + 2;
//         this.setState({ count: newCount });
//       }
//     }
//     render() {
//       const { novosti, count } = this.state;
//       return (
//         <div >
//           <div className = "list">
//           {
//             novosti.slice(0, count).map(novostb => (
//               <News
//                 key = {novostb.id}
//                 name = {novostb.textName}
//                 text = {novostb.text}
//               />
//             ))
//           }
//           <button className = "addnews" onClick = {this.addnews}>
//             Добавить ещё новости
//           </button>
//           </div>
//         </div>
//       );
//     }
//   });
