'use client';

import useBlockedSlots from '@/hooks/useBlockedSlots';
import { useSidebar } from '@/providers/SidebarContext';
import { BlockedSlot } from '@/types';
import { convertToTimeRange } from '@/utils/convertToTimeRange';
import { formatDuration, getParsedDate } from '@/utils/helpers';

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { MdClose } from 'react-icons/md';

import clsx from 'clsx';
import { format } from 'date-fns';

interface BlockedSlotProps {
  blockedSlot: BlockedSlot;
  className?: string;
  style?: {
    height: string;
    top: string;
  };
  isCard?: boolean;
}

export default function BlockedSlotView({
  blockedSlot,
  className,
  style,
  isCard,
}: BlockedSlotProps) {
  const { isExtended } = useSidebar();
  const [deleteFlag, setDeleteFlag] = useState(false);
  const { _id, date, slot, duration, reason } = blockedSlot;
  const { deleteBlockedSlot } = useBlockedSlots();

  const handleDeleteClick = async () => {
    await deleteBlockedSlot(_id);
    toast.success('Blocked slot was successfully deleted!', {
      duration: 3000,
    });
  };

  return (
    <div
      style={style}
      className={clsx(
        className,
        isCard
          ? 'flex sm:flex-wrap items-center gap-2.5 justify-between lg:hidden border border-accentColor rounded-lg p-4 bg-mainLightColor shadow-lg hover:shadow-none hover:bg-bgColor transition-colors'
          : 'text-center px-1 lg:py-0.5 lg:px-3.5 shadow-md rounded-xl md:rounded-lg text-xs lg:text-sm hover:border cursor-not-allowed border-transparent border flex flex-col justify-center items-center bg-[rgb(202,202,202)]',
      )}
    >
      {isCard ? (
        <>
          <div>
            <div className="mb-2">
              <span className="text-sm text-textColor">
                {format(getParsedDate(date), 'dd.MM.yyyy')}
              </span>
            </div>
            <div className="mb-2 font-bold text-lg text-textColor">
              <span className="uppercase"> Blocked Slot</span>
            </div>
            <div className="mb-2">
              <span className="font-medium text-xs sm:text-sm text-textColor">
                {convertToTimeRange(slot, duration)}
              </span>
            </div>
            <div className="mb-2">
              {deleteFlag ? (
                <div className="space-x-2">
                  <button
                    type="button"
                    title="yes"
                    onClick={handleDeleteClick}
                    className="text-xs sm:text-sm font-medium py-0.5 px-1  text-error bg-transparent cursor-pointer hover:text-accentColor hover:border-accentColor hover:underline"
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    title="no"
                    onClick={() => setDeleteFlag(false)}
                    className="text-xs sm:text-sm font-medium py-0.5 px-1  text-cardColor bg-transparent cursor-pointer hover:text-accentColor hover:border-accentColor hover:underline"
                  >
                    No
                  </button>
                </div>
              ) : (
                <button
                  title="delete"
                  onClick={() => setDeleteFlag(true)}
                  className="text-xs sm:text-sm font-medium py-0.5 px-1  text-error bg-transparent cursor-pointer hover:text-accentColor hover:border-accentColor hover:underline"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
          <div>
            <div className="mb-2">
              <span className="font-semibold text-base sm:text-lg md:text-xl text-cardColor">
                {slot}
              </span>
            </div>

            <div>
              <span className="font-semibold text-sm text-accentColor">
                {formatDuration(duration)}
              </span>
            </div>
          </div>
        </>
      ) : (
        <>
          <span
            className={clsx('font-medium', isExtended ? 'text-xs' : ' text-sm')}
          >
            Blocked Slot
          </span>
          <span className="text-mainDarkColor">
            {convertToTimeRange(slot, duration)}
          </span>
          <span className="text-xs h-4">{reason || ' '}</span>

          {deleteFlag ? (
            <div className="space-x-2 absolute top-2 right-2">
              <button
                type="button"
                title="yes"
                onClick={handleDeleteClick}
                className="text-xs sm:text-sm font-medium py-0.5 px-1  text-error bg-transparent cursor-pointer hover:text-accentColor hover:border-accentColor hover:underline"
              >
                Yes
              </button>
              <button
                type="button"
                title="no"
                onClick={() => setDeleteFlag(false)}
                className="text-xs sm:text-sm font-medium py-0.5 px-1  text-cardColor bg-transparent cursor-pointer hover:text-accentColor hover:border-accentColor hover:underline"
              >
                No
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="absolute top-2 right-2"
              onClick={() => setDeleteFlag(true)}
              aria-label="Delete blocked slot"
            >
              <div className=" bg-mainDarkColor hover:bg-cardColor transition-colors rounded-full">
                <MdClose className="text-lg text-mainLightColor" />
              </div>
            </button>
          )}
        </>
      )}
    </div>
  );
}
