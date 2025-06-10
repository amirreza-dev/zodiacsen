'use client';

import { useState } from 'react';
import {
 Dialog,
 DialogBackdrop,
 DialogPanel,
 DialogTitle,
} from '@headlessui/react';

export default function Home() {
 const [count, setCount] = useState<number | null>(null);
 const [open, setOpen] = useState(true);
 const [shuffledRoles, setShuffledRoles] = useState<string[]>([]);
 const [currentIndex, setCurrentIndex] = useState(0);
 const [currentRole, setCurrentRole] = useState<string | null>(null);
 const [isFlipped, setIsFlipped] = useState(false);
 const [playerName, setPlayerName] = useState('');
 const [assignedPlayers, setAssignedPlayers] = useState<
  { name: string; role: string }[]
 >([]);

 const allRoles = [
  'آل کاپن',
  'بمب گذار',
  'شعبده باز',
  'زودیاک',
  'حرفه ای',
  'دکتر',
  'کارآگاه',
  'تنفگدار',
  'محافظ',
  'اوشن',
  'شهروند ساده',
  'شهروند ساده',
  'مافیا ساده',
  'شهروند ساده',
 ];

 const shuffleArray = (arr: string[]) =>
  [...arr].sort(() => Math.random() - 0.5);

 const handleCountSelection = (num: number) => {
  const selected = allRoles.slice(0, num);
  setShuffledRoles(shuffleArray(selected));
  setCount(num);
  setCurrentIndex(0);
  setAssignedPlayers([]);
  setIsFlipped(false);
  setCurrentRole(null);
  setPlayerName('');
 };

 const handleShowNextRole = () => {
  if (currentIndex < shuffledRoles.length) {
   setCurrentRole(shuffledRoles[currentIndex]);
   setIsFlipped(true);
  }
 };

 const handleSubmitName = () => {
  if (playerName.trim() === '') return;
  setAssignedPlayers([
   ...assignedPlayers,
   { name: playerName, role: currentRole! },
  ]);
  setCurrentIndex(currentIndex + 1);
  setIsFlipped(false);
  setCurrentRole(null);
  setPlayerName('');
 };

 return (
  <main className='min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6'>
   <h1 className='text-3xl font-bold mb-6'>سناریو زودیاک 🎭</h1>

   {!count && (
    <>
     <h2 className='text-xl mb-4'>تعداد بازیکن‌ها رو انتخاب کن:</h2>
     <div className='flex gap-4'>
      {[12, 14].map((num) => (
       <button
        key={num}
        onClick={() => handleCountSelection(num)}
        className='px-6 py-2 bg-red-600 rounded hover:bg-red-700'
       >
        {num}
       </button>
      ))}
     </div>
    </>
   )}

   {count && currentIndex < shuffledRoles.length && (
    <>
     <button
      onClick={handleShowNextRole}
      disabled={isFlipped}
      className='mt-10 px-6 py-3 bg-red-500 rounded hover:bg-red-600 disabled:opacity-50'
     >
      نمایش نقش
     </button>

     <div className='mt-6 perspective'>
      <div className={`flip-card ${isFlipped ? 'flipped' : ''}`}>
       <div className='flip-card-inner'>
        <div className='flip-card-front bg-gray-800 rounded-lg' />
        <div className='flip-card-back bg-amber-500 text-black text-2xl font-bold flex items-center justify-center rounded-lg'>
         {currentRole}
        </div>
       </div>
      </div>
     </div>

     {isFlipped && (
      <div className='mt-6 flex flex-col items-center'>
       <input
        type='text'
        placeholder='نام بازیکن'
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        className='px-4 py-2 text-white bg-gray-700 rounded mb-5 w-64'
       />
       <button
        onClick={handleSubmitName}
        className='px-6 py-2 bg-orange-500 hover:bg-orange-600 rounded'
       >
        ثبت
       </button>
      </div>
     )}
    </>
   )}

   {count && currentIndex >= shuffledRoles.length && (
    <div className='mt-12 w-full max-w-xl'>
     <h2 className='text-2xl font-semibold mb-4 text-center'>نتایج نهایی 🎉</h2>
     <ul className='space-y-2'>
      {assignedPlayers.map((p, idx) => (
       <li
        key={idx}
        className='bg-gray-800 px-4 py-2 rounded flex justify-between items-center'
       >
        <span>{p.name}</span>
        <span className='text-sm text-amber-300'>{p.role}</span>
       </li>
      ))}
     </ul>

     {/* Zodiac Letter */}
     <div className='mt-12 text-center'>
      <button
       onClick={() => setOpen(true)}
       className='rounded-md bg-transparent px-2.5 py-1.5 text-sm ring-1 ring-amber-500 text-amber-500'
      >
       نامه زودیاک
      </button>
     </div>
     <Dialog open={open} onClose={setOpen} className='relative z-10'>
      <DialogBackdrop
       transition
       className='fixed inset-0 bg-gray-900 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in'
      />

      <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
       <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
        <DialogPanel
         transition
         className='relative transform overflow-hidden rounded-lg bg-gray-800 text-center shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95'
        >
         <div className='bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
          <div className='mt-3 text-center sm:mt-0 sm:mr-4'>
           <DialogTitle as='h2' className='text-base font-semibold text-white'>
            نامه زودیاک
           </DialogTitle>
           <div className='mt-2'>
            <p className='text-sm text-white'>
             به هیچ وجه نامه رو نبند وگرنه درجا از بازی کیک میشی! فقط نامه رو
             بنویس و گوشی رو تحویل گرداننده بده
            </p>
           </div>
          </div>
         </div>

         <textarea
          id='letter'
          name='letter'
          rows={8}
          className='block w-full rounded-md border-0 py-1.5 p-5 text-white shadow-sm ring-1 ring-gray-600 sm:text-sm sm:leading-6'
          defaultValue={''}
          placeholder='محل نوشتن نامه زودیاک'
         />

         <div className='bg-gray-800 px-4 py-3 sm:flex sm:flex-row sm:px-6'>
          <button
           type='button'
           onClick={() => setOpen(false)}
           className='inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:mr-3 sm:w-auto'
          >
           فقط گرداننده نامه رو ببنده
          </button>
         </div>
        </DialogPanel>
       </div>
      </div>
     </Dialog>

     <textarea
      id='comment'
      name='comment'
      rows={8}
      className='block w-full mt-8 rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-gray-600 sm:text-sm sm:leading-6'
      defaultValue={''}
     />
    </div>
   )}

   <footer className='mt-20 text-sm text-gray-400'>
    طراحی و توسعه توسط <a href='https://amirreza.dev'>امیررضا</a>
   </footer>
  </main>
 );
}
