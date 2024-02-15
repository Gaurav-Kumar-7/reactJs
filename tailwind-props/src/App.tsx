import "./App.css";
import Card from "./components/card";

function App() {
  // let cardOne = {
  //   name: "Leanne Graham",
  //   email: "Bret@gmail.com",
  // }
  // // lets try to pass an Array

  // let CardTwo =[1, 2, 3, 5]
  return (
    <>
      <h1 className="bg-green-400 text-black p-4 rounded-xl mb-4">Tailwind Test</h1>
      {/* <figure className="mdbg-slate-100 rounded-xl p-8 dark:bg-slate-800">
        <img
          className="w-24 h-24 rounded-full mx-auto"
          src="https://images.pexels.com/photos/16658578/pexels-photo-16658578/free-photo-of-eagle.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
          width="384"
          height="512"
        />
        <div className="pt-6 text-center space-y-4">
          <blockquote>
            <p className="text-lg font-medium">
              “Tailwind CSS is the only framework that I've seen scale on large
              teams. It’s easy to customize, adapts to any design, and the build
              size is tiny.”
            </p>
          </blockquote>
          <figcaption className="font-medium">
            <div className="text-sky-500 dark:text-sky-400">Sarah Dayan</div>
            <div className="text-slate-700 dark:text-slate-500">
              Staff Engineer, Algolia
            </div>
          </figcaption>
        </div>
      </figure> */}

      {/* <Card channel="Dinesh" cardOneDetailsObj={cardOne} cardTwoDetailsArr={CardTwo}/> */}
      <Card userName="Dinesh" btn_text="clicked me" />
      <Card userName="Raja"  btn_text="visit me" />
    </>
  );
}

export default App;
