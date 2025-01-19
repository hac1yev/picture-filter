import ApplyEffects from "./components/ApplyEffects";

const App = () => {  
  return (
    <div className="app">
      <div className="generate-image-wrapper">
        <div>
          <canvas id="generated-image"></canvas>
        </div>
      </div>
      <div className="edit-image">
        <ApplyEffects />
      </div>
    </div>
  );
};

export default App;
