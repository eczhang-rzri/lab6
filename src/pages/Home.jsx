import Section from "../components/Section"
import ValueList from "../components/ValuesList"
import EventList from "../components/EventsList"

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useName } from "../context/NameContext";
import { useState } from "react";

export default function Home() {
    const { setName } = useName();
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
      };
    
      const handleButtonClick = () => {
        setName(inputValue);
      };

    return (
        <div>
            <Section header={'Highlights'}>
                <ValueList/>
                <EventList/>
            </Section>

            <Section header={'Latest Event'}>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis animi laudantium eos atque sed debitis eum deleniti cumque saepe aut voluptatibus, dolores commodi corporis quibusdam
                numquam perferendis, molestias tenetur suscipit!.</p>
                <img src="https://plus.unsplash.com/premium_photo-1709247069711-068d383b8497?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Kickball outing" />

                <img src="https://plus.unsplash.com/premium_photo-1661429511577-b165fc04718f?q=80&w=2971&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Happy Hour" />
            </Section>

            <Section header={'Modify Header'}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <TextField 
                        id="enter-name" 
                        label="Enter your name" 
                        variant="standard" 
                        onChange={handleInputChange}
                    />
                    <Button variant="contained" sx={{ ml: 4 }} onClick={handleButtonClick}>Update Header</Button>
                </Box>
            </Section>
        </div>
    )
}