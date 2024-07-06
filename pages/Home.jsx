import { ToggleButton } from "../cmps/ToggleButton.jsx"

const { useSelector } = ReactRedux
const { useState } = React

export function Home() {
    const counter = useSelector(state => state.counter)
    const [isOn, setIsOn] = useState(false)

    return (
        <section className="home">
            <h1>Todo's R Us!</h1>
            <p>{counter}</p>
            <ToggleButton val={isOn} setVal={setIsOn} />
            {isOn && <img src="../assets/img/todo.png" alt="" />}
        </section>
    )
}