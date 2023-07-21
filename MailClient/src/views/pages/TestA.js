import {Link, useNavigate} from 'react-router-dom';

function TestA(props) {

  const navigate = useNavigate();

  const toTestB=()=>{

    const data ={state:{id:1,name:'sabaoon'}} ;
navigate('/TestB',data);
  }
  return (
   <>
<div> <a onClick={toTestB}>button</a>
</div>
</>
  );


}


export default TestA;