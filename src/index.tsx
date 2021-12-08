import React, {useRef, useState} from 'react';
import ReactDom from 'react-dom';

/*
This is a way to define custom types in TypeScript.
The syntax is quite straightforward, you define a list of key value properties with the name and then type.
 */

interface ListItemProps {
  value: string
}

/*
You can extract functionality of another component into smaller components for re-usability or maintainability.
Here we're using that interface we defined above. We're assigning it to props after the :

If you access props, you should see that your IDE knows the properties available on props and their types.
 */

export function ListItem(props: ListItemProps) {
  return (
    <li>{props.value}</li>
  );
}

/*
Functions act as ways to make your code modular, by splitting parts of your application
into smaller components.
 */

export default function App() {
  /*
  useState is a way of declaring variables that your website will 'react' to upon modification.
  The first value listed below is the variable you'll read the value from. You should not re-assign this
  variable as your page will not update. The second value is a function you can call to update the value.
  This function can either take a new value or a function that passes the previous state of the variable
  as an argument for you to manipulate. This setter expects a new value to be returned. This means you can't
  just call .push(item) on an array for example, this will not update your website. You'd need to instead create
  a new list, append all the previous array items and then your new data. Further below is a shorthand for doing this.
   */

  const [list, setList] = useState<string[]>([]);

  /*
  useRef is similar to useState except that it is doesn't cause the page to re-render when the value is updated.
  If you access the inputRef below you'll notice the only property is .current, that's the actual variable/data you're
  storing.

  The reason for this is due to how JavaScript handles value and reference types. Types such as arrays or objects
  will be passed as reference to any function you pass them to. This means that the value of that object won't be copied but
  a pointer to the values place in memory will be passed. This means that any modification to that value from anywhere in your
  program will replicate across any other uses of that variable since they all read and write to the same place in memory.
  However, certain types such as number are passed by value. This means that every time you pass a number to a function, it's
  copied to a new place in memory. This means that any modifications to that number variable in another function won't replicate
  across of other uses.

  So, going off what we just learnt, if useRef wraps whatever your variable is in an object that means you're always dealing
  with a reference type. Even if you're storing a number. This is useful if you're passing this variable to a child component
  and want the changes to be reflected elsewhere in your code.

  Generally, you should use useRef when you're going to be passing a variable to a child component and don't want your website
  to react to any changes on it. Or as the example here shows, useRef can be passed along to any html tag to get a reference
  to it. Then you can get an input's value or whatever. It's like calling querySelector().

  If you just have a variable that's staying local to its component, and you don't want your page to update on a value change,
  you should just use a normal JavaScript variable.
   */
  const inputRef = useRef<HTMLInputElement>(null);

  // Here we're defining a function handler for when the user clicks the below submit button.
  const onSubmit = () => {
    // Since we passed null to the initialValue argument for useRef, TypeScript warns us it could be null, so we check first.
    if (inputRef.current) {
      /*
      Here I'm using a shorthand to create a new list, append all the previous states items and then the new item.

      It looks weird but it's not that bad. Let's break it down.

      The question marks at inputRef.current?.value ?? '' can be ignored.

      First, how do we declare a new empty array? const array = [];
      Well we have [] surrounding the below values, so we must be declaring a new array.

      prevState has ... before it. This is known as the spread operator. It 'spreads' out the items of an array.
      The best way to demonstrate what this does is to show what the spread operator does under the hood.

      let prevState = [1,2,3];
      prevState = [...prevState,4,5,6] translates to:
      [1,2,3,4,5,6]

      As you can see it spread out the items into the new array to the same syntax used when first initialising prevState.
       */
      setList((prevState) => [...prevState, inputRef.current?.value ?? '']);
    }
  };

  return (
    <>
      <h1>To-Do List</h1>
      <ul>
        {list.map((value, index) => (
          <ListItem key={index} value={value}/>
        ))}
      </ul>
      <input ref={inputRef} placeholder='Enter a new item'/>
      <button onClick={() => onSubmit()}>Submit</button>
    </>
  );
}

ReactDom.render(<App />, document.getElementById('root'));
