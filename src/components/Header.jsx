import React from 'react';
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';

 const Header = () => {
   return (
     <header css={css`
     background-color: #145287;
   `}>
       <h1 css={css`color: #ffffff; text-align:center;`}>Check the Weather</h1>
     </header>
   )
 }

 export default Header
