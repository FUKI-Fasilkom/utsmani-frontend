'use client'
/* eslint-disable prettier/prettier */
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useEffect, useState } from "react";

export const ActivitySection: React.FC = () => {
  let test =[];
  const lenData = 10;
  for(let i = 0; i < 10; i++){
    test.push(i);
  };

  const [selected1, setSelected1]= useState(1);
  const [selected2, setSelected2]= useState(1);
  useEffect(()=>{
    function refreshCarouselAtas(){
        document.getElementById(`item-${selected1 - 1}-atas`)?.classList.add('rotate-y-30');
        document.getElementById(`item-${selected1}-atas`)?.classList.remove('rotate-y-30');
        document.getElementById(`item-${selected1}-atas`)?.classList.remove('-rotate-y-30');
        document.getElementById(`item-${selected1 + 1}-atas`)?.classList.add('-rotate-y-30');
    }
    refreshCarouselAtas();
    document.getElementById('previous-button-1')?.addEventListener('click', (e)=>{
      e.preventDefault();
      if(selected1 > 1){
        setSelected1(selected1 - 1);
        refreshCarouselAtas();
      }
    });
    document.getElementById('next-button-1')?.addEventListener('click', (e)=>{
      e.preventDefault();
      if(selected1 < lenData){
        setSelected1(selected1 + 1);
        refreshCarouselAtas();
      }
    });
    function refreshCarouselBawah(){
      document.getElementById(`item-${selected2 - 1}-bawah`)?.classList.add('rotate-y-30');
      document.getElementById(`item-${selected2}-bawah`)?.classList.remove('rotate-y-30');
      document.getElementById(`item-${selected2}-bawah`)?.classList.remove('-rotate-y-30');
      document.getElementById(`item-${selected2 + 1}-bawah`)?.classList.add('-rotate-y-30');
    }
    refreshCarouselBawah();
    document.getElementById('previous-button-2')?.addEventListener('click', (e)=>{
      e.preventDefault();
      if(selected2 > 1){
        setSelected2(selected2 - 1);
        refreshCarouselBawah();
      }
    });
    document.getElementById('next-button-2')?.addEventListener('click', (e)=>{
      e.preventDefault();
      if(selected2 < lenData){
        setSelected2(selected2 + 1);
        refreshCarouselBawah();
      }
    });
    }, [selected2, selected1]);

  return (
    <section className="w-full flex flex-col px-16 gap-6 justify-center items-center">
      <h1 className="h-[75px] text-[3rem] font-bold leading-normal text-center text-[#6C4534]">Kegiatan</h1>
      
      {/* kegiatan atas */}
      <Carousel className="w-full relative flex flex-col">
        <CarouselContent className="w-full py-10">
          {test.map((item)=>(
            <CarouselItem className="basis-1/3 w-[444px] h-[304px] flex justify-center items-center perspective-1600" key={item} >
              <div className="w-full h-full bg-[url(https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg)] flex justify-center items-center text-white text-justify transform-style-3d transform-cpu transition-all rounded-[1.25rem] bg-cover" id={`item-${item}-atas`}>
              {item}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious size="md" className="border-2 bg-[#6C4534] text-white" id="previous-button-1"/>
        <CarouselNext size="md" className="border-2 bg-[#6C4534] text-white" id="next-button-1"/>
        <div className="w-full flex gap-2 justify-center items-center">
            <div className="w-1/3 rounded-full justify-center items-center flex gap-3">
              {test.map((item)=>( item == selected1 ?
                <div className="w-2 h-2 rounded-full bg-gray-700" key={item}></div>:
                <div className="w-2 h-2 rounded-full bg-gray-300" key={item}></div>
              ))}              
            </div>
        </div>
      </Carousel>

      {/* kegiatan bawah */}
      <Carousel className="w-full relative flex flex-col">
        <CarouselContent className="w-full py-10">
          {test.map((item)=>(
            <CarouselItem className="basis-1/3 w-[444px] h-[304px] flex justify-center items-center perspective-1600" key={item} >
              <div className="w-full h-full bg-[url(https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg)] flex justify-center items-center text-white text-justify transform-style-3d transform-cpu transition-all rounded-[1.25rem] bg-cover" id={`item-${item}-bawah`}>
              {item}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious size="md" className="border-2 bg-[#6C4534] text-white" id="previous-button-2"/>
        <CarouselNext size="md" className="border-2 bg-[#6C4534] text-white" id="next-button-2"/>
        <div className="w-full flex gap-2 justify-center items-center">
            <div className="w-1/3 rounded-full justify-center items-center flex gap-3">
              {test.map((item)=>( item == selected2 ?
                <div className="w-2 h-2 rounded-full bg-gray-700" key={item}></div>:
                <div className="w-2 h-2 rounded-full bg-gray-300" key={item}></div>
              ))}              
            </div>
        </div>
      </Carousel>    
    </section>
  )
}
