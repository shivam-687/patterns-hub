import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import PatterNotFound from '../../components/PatterNotFound'
import QuestionLayout from '../../components/QuestionLayout'
import {Question} from '../../lib/Question'
import { Patterns } from '../../lib/questions/index'

const QuestionPage: NextPage = () => {
    const router = useRouter();
    const query = router.query;
    const [pattern, setPattern] = useState<Question>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isNotFound, setIsNotFound] = useState<boolean>(true);
    const [patternId, setPatternnId] = useState<string>();
    useEffect(() => {
      const id = query['id'];
      console.log("Id: ", id);
        if(id){
          if(isNaN(parseInt(id as string))){
            setIsNotFound(true);
            console.log("IsNan ");
          }else{
            const pat = Patterns[parseInt(id as string)-1];
            console.log("Pattern dd", parseInt(id as string));
            if(pat){
              setPatternnId(id as string);
              setPattern(pat.pattern);
              setIsNotFound(false);
            }else{
              setIsNotFound(true)
            }
          }
        }
    }, []);
  return (
    <div className='py-10'>
      {
        isNotFound ?
        <div className='h-screen flex items-center justify-center'>
          <PatterNotFound/>
        </div>
        :
        pattern
        ?<div>
          <div className="hidden md:block"><QuestionLayout question={pattern} patternId={patternId||''}/></div>
          <div className="flex items-center justify-center md:hidden px-5 h-[calc(100vh-200px)]">
            <h3 className='text-xl font-bold'>We are sorry! <br/> Currently, this site is supported only <span className='text-primary'>Tablet</span> and <span className='text-primary'>Desktop</span> screen <br/> <span className='text-primary text-2xl'>Mobile version available soon!</span></h3>
          </div>
        </div>
        :<div className='h-screen flex items-center justify-center'>
        <h1 className="text-3xl">Loading...</h1>
      </div>
      }
    </div>
  )
}

export async function getServerSideProps() {
  // Fetch data from external API
  // const res = await fetch(`https://.../data`)
  // const data = await res.json()

  // Pass data to the page via props
  return { props: {  } }
}

export default QuestionPage;