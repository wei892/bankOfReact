/*==================================================
src/components/Debits.js

The Debits component contains information for Debits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import {Link} from 'react-router-dom';

const Debits = (props) => {
  // Create the list of Debit items
  let debitsView = () => {
    const { debits } = props;
    return debits.map((debit) => {  // Extract "id", "amount", "description" and "date" properties of each debits JSON array element
      let date = debit.date.slice(0,10);
      return <li key={debit.id}> ${debit.amount} {debit.description} {date}</li>
    });
  }
  // console.log()
  function handleOnSubmit(event) {
    event.preventDefault(); 
    const description = event.target.description.value;
    let amount = event.target.amount.value;
    amount = Math.round(amount * 100) / 100;
    if (amount > 0 && description) {
      const newDebit = {
        id: props.debits.length + 1,
        description,
        amount,
        date: new Date().toISOString(),
      };

      props.addDebit(newDebit);
      event.target.reset(); 
    } else {
      event.target.reset();
    }
  }
  // Render the list of Debit items and a form to input new Debit item
  return (
    <div>
      <h1>Debits</h1>
      {debitsView()}
      <p>Balance: ${props.balance}</p>
      <form onSubmit={handleOnSubmit}>
        <input type="text" name="description" alt="description" placeholder='description'/>
        <input type="number" name="amount" alt="amount" placeholder='amount' step="any"/>
        <button type="submit">Add Debit</button>
      </form>
      <br/>
      <Link to="/">Return to Home</Link>
    </div>
  );
}

export default Debits;