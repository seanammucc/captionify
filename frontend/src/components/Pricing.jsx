import { Check } from 'lucide-react'
import { signUp } from '../utils/signUp'

export default function Pricing() {
  return (
    <div className='flex gap-2 '>
        <section className='bg-gray-100 rounded-lg p-5 mt-10 mx-auto'>
            <h3 className='text-xl font-bold'>$3/month</h3>
            <h3 className='font-bold'>Standard</h3>
            <p>Lorem ipsum dolor sit.</p>
            <div className='opacity-80 text-sm'>
                <div className='flex items-center '>
                <Check/>
                    <p >Lorem, ipsum dolor.</p>
                </div>
                <div className='flex items-center'>
                <Check/>
                    <p>Lorem.</p>
                </div>
                <div className='flex items-center'>
                <Check/>
                    <p>Lorem, ipsum.</p>
                </div>
            </div>
            <button onClick={() => {signUp()}} className='bg-black px-4 py-2 font-semibold rounded-md text-white mt-5'> Buy Now</button>
        </section>
    </div>
  )
}
