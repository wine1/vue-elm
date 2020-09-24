// export const loadMore = {
//   directtives: {
//     "load-more": {
//       bind: (el, binding) => {
//         let windowHeight = window.screen.height;
//         let height;
//         let setTop;
//         let PaddingBottom;
//         let marginBottom;
//         let requestFram;
//         let oldScrollTop;
//         let scrollEl;
//         let heightEl;
//         let scrollType = el.attributes.type && el.attributes.type.value;
//         let scrollReduce = 2;
//         if (scrollType == 2) {
//           scrollEl = el;
//           heightEl = el.children[0];
//         } else {
//           scrollEl = document.body;
//           heightEl = el;
//         }

//         el.addEventListener('touchstart',()=>{
//             height=heightEl.clientHeight;
//             if(scrollType == 2) {
//                 height=height
//             }
//             setTop=el.offsetTop
//         })
//       }
//     }
//   }
// };
