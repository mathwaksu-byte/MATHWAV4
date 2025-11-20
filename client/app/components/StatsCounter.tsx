import { useEffect, useRef, useState } from 'react';

interface StatItem {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
}

interface StatsCounterProps {
  stats: StatItem[];
}

function CountUp({ end, start, duration = 2, prefix = '', suffix = '' }: { end: number; start: boolean; duration?: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = 0;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, end, duration]);
  return <span>{prefix}{count}{suffix}</span>;
}

export default function StatsCounter({ stats }: StatsCounterProps) {
  const refs = useRef<Array<HTMLDivElement | null>>([]);
  const [visible, setVisible] = useState<boolean[]>(stats.map(() => false));
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const idx = refs.current.indexOf(entry.target as HTMLDivElement);
        if (idx >= 0 && entry.isIntersecting) {
          setVisible((prev) => {
            if (prev[idx]) return prev;
            const next = [...prev];
            next[idx] = true;
            return next;
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [stats.length]);
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          ref={(el) => (refs.current[index] = el)}
          className={`text-center transition-all duration-700 ${visible[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
          style={{ transitionDelay: `${index * 100}ms` }}
        >
          <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
            <CountUp end={stat.value} start={visible[index]} prefix={stat.prefix} suffix={stat.suffix} />
          </div>
          <div className="text-gray-600 text-sm md:text-base">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
