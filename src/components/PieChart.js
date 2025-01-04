import { Pie } from 'react-chartjs-2';
import React from 'react';
import { Chart, Tooltip, Legend, ArcElement } from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import { MdCancel } from "react-icons/md";

Chart.register(Tooltip, Legend, ArcElement);

export default function PieChart({setShowChart }) {
    const products = useSelector((state) => state.products);
    console.log("Pie" ,products);
    const dataPie = {
        phone : parseInt(products.filter((product,index)=>product.name === "Phone").reduce((totale , c)=> totale + parseInt(c.qt) , 0)),
        laptop : parseInt(products.filter((product,index)=>product.name === "Laptop").reduce((totale , c)=> totale + parseInt(c.qt) , 0)),
        tablet : products.filter((product,index)=>product.name === "Tablet").reduce((totale , c)=> totale +  parseInt(c.qt) , 0),
        headPhones : products.filter((product,index)=>product.name === "Headphones").reduce((totale , c)=> totale + parseInt(c.qt) , 0)
    }
    console.log("data" , dataPie);
  const data = {
    labels: ['Phone', 'Laptop',"Tablet","Headphones"],
    datasets: [
      {
        label: 'Quantite en stock',
        data: [dataPie.phone,dataPie.laptop,dataPie.tablet,dataPie.headPhones],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(174, 179, 179, 0.2)',
          'rgba(4, 62, 150, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgb(63, 90, 90)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div
      style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width : "300px" ,
        height : "300px",
        position:"relative"
      }}
    >
        <MdCancel style={{cursor:"pointer" , position:"absolute" ,right : "20px"}} onClick={() => setShowChart(false)}/>
      <Pie data={data} options={options} />
    </div>
  );
}
