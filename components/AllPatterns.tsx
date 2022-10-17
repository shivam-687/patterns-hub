import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { Pattern, Patterns } from '../lib/questions/index'
import PatternCard from './PatternCard';

const AllPatterns = () => {
  const [patterns, setPatterns] = useState<Pattern[]>([]);

  useEffect(() => {
    setPatterns(Patterns);
  }, [])

  return (
    <>
      <div className='container mx-auto px-5'>
        <div className='text-2xl'>All Patterns</div>

        <div className='pt-10 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-5'>
          {
            patterns.map((pt, index) => {
              return <Link href={`/patterns/${index+1}`} key={index}>
                <a className='block'>
                <PatternCard id={index + ''} image={pt.meta.thumbnail || ''} title={pt.meta.title} key={index} />
                </a>
              </Link>
            })
          }
        </div>
      </div>
    </>
  )
}

export default AllPatterns