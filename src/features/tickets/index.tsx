"use client";

import { ticketsMock } from "@/data/tickets";
import { useState } from "react";
import { DialogTrigger, Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Modal from "@/components/Modal";

export default function Tickets() {
  const [tickets, setTickets] = useState(ticketsMock);

  const handleStatus = (ticketId, newStatus) => {
    setTickets(
      tickets.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
      )
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tickets</h1>

      <div className="md:block overflow-x-auto">
        <table className="w-full border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b text-left bg-gray-100">
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">Titulo</th>
              <th className="py-2 px-4">Nome</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Ultima atualização</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{ticket.id}</td>
                <td className="py-2 px-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="link" className="p-0 text-lg cursor-pointer">{ticket.title}</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <Modal ticket={ticket} setTickets={setTickets} tickets={tickets} />
                    </DialogContent>
                  </Dialog>
                </td>
                <td className="py-2 px-4">{ticket.creator}</td>
                <td className="py-2 px-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="link">{ticket.status}</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>Ticket Status</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuRadioGroup
                        value={ticket.status}
                        onValueChange={(value) =>
                          handleStatus(ticket.id, value)
                        }
                      >
                        <DropdownMenuRadioItem value="Aberto">
                          Aberto
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="Em progresso">
                          Em progresso
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="Concluído">
                          Concluído
                        </DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
                <td className="py-2 px-4">{ticket.lastUpdated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}