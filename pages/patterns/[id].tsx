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
              setPattern(pat.pattern);
              setIsNotFound(false);
            }else{
              setIsNotFound(true)
            }
          }
        }
    }, []);
  return (
    <div>
      {
        isNotFound ?
        <div className='h-screen flex items-center justify-center'>
          <PatterNotFound/>
        </div>
        :
        pattern
        ?<QuestionLayout question={pattern}/>
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