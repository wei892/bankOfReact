/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import {Link} from 'react-router-dom';
import Debits from './Debits';

const Credits = (props) => {
  let CreditsView = () => {
    const { credits } = props;
    return credits.map((credit) => {  // Extract "id", "amount", "description" and "date" properties of each debits JSON array element
      let date = credit.date.slice(0,10);
      return <li key={credit.id}> ${credit.amount} {credit.description} {date}</li>
    });
  }

  function handleOnSubmit(event) {
    event.preventDefault(); 
    const description = event.target.description.value;
    let amount = event.target.amount.value;
    amount = Math.round(amount * 100) / 100;
    if (amount > 0 && description) {
      const newCredit = {
        id: props.credits.length + 1,
        description,
        amount,
        date: new Date().toISOString(),
      };

      props.addCredit(newCredit);
      event.target.reset(); 
    } else {
      event.target.reset();
    }
  }
  return (
    <div>
      <h1>Credits</h1>
      {CreditsView()}
      <p>Balance: ${props.balance}</p>
      <form onSubmit={handleOnSubmit}>
        <input type="text" name="description" alt="description" placeholder='description'/>
        <input type="number" name="amount" alt="amount" placeholder='amount' step="any"/>
        <button type="submit">Add Credit</button>
      </form>
      <br/>
      <Link to="/">Return to Home</Link>
    </div>
  );
}

export default Credits;