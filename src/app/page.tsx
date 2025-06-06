'use client';

import { useState } from 'react';

export default function Home() {
 const [count, setCount] = useState<number | null>(null);
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
