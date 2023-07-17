import React, { useState } from "react";
import BodyButton from "./components/BodyButton";
function App() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <>
      <div className="app-wrapper border-radius-1 padding-y-2 padding-x-1 display-flex flex-column">
        <div className="header display-flex flex-row bb-1 mb-7">
          <h1 className="font-color-primary">Hello, Jose</h1>
          <button className="header-btn" />
        </div>
        <div className="body">
          <div className="slider">
            {/* Today's tasks here*/}
            <BodyButton />
            {/* function category.each do |f|  */}
            <BodyButton />
          </div>
          <div className="">{/* Task Buttons task.each do |f| */}</div>
        </div>
        <div className="footer">
          <h1 className="font-color-primary"></h1>
        </div>
      </div>
    </>
  );
}

export default App;
