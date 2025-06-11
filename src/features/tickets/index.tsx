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
import { Ticket } from "@/types/ticket";

export default function Tickets() {
  const [tickets, setTickets] = useState<Ticket[]>(ticketsMock);
  const [filterStatus, setFilterStatus] = useState<string>("Todos");

  const handleStatus = (ticketId: number, newStatus: string) => {
    setTickets(
      tickets.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
      )
    );
  };

  const filteredTickets =
    filterStatus === "Todos"
      ? tickets
      : tickets.filter((ticket) => ticket.status === filterStatus);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tickets</h1>

      <div className="mb-4 flex items-center gap-2">
        <span className="font-medium">Filtrar por status:</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">{filterStatus}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuRadioGroup
              value={filterStatus}
              onValueChange={(value) => setFilterStatus(value)}
            >
              <DropdownMenuRadioItem value="Todos">Todos</DropdownMenuRadioItem>
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
      </div>

      <div className="md:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b text-left bg-gray-100 h-12">
              <th className="py-2 px-4 w-[10%]">ID</th>
              <th className="py-2 px-4 w-[30%]">Título</th>
              <th className="py-2 px-4 w-[20%]">Nome</th>
              <th className="py-2 px-4 w-[20%]">Status</th>
              <th className="py-2 px-4 w-[20%]">Atualização</th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.length === 0 ? (
              <tr className="h-12">
                <td colSpan={5} className="py-2 text-center text-gray-500">
                  Não há nenhum ticket
                </td>
              </tr>
            ) : (
              filteredTickets.map((ticket) => (
                <tr key={ticket.id} className="border-b h-12 hover:bg-gray-50">
                  <td className="py-2 px-4 align-middle truncate">{ticket.id}</td>
                  <td className="py-2 px-4 align-middle truncate">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="link" className="p-0 text-left truncate">
                          {ticket.title}
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <Modal
                          ticket={ticket}
                          setTickets={setTickets}
                          tickets={tickets}
                        />
                      </DialogContent>
                    </Dialog>
                  </td>
                  <td className="py-2 px-4 align-middle truncate">{ticket.creator}</td>
                  <td className="py-2 px-4 align-middle">
                    <div className="flex items-center h-full">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="link" 
                            className="truncate p-0 m-0 h-auto"
                          >
                            {ticket.status}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                          <DropdownMenuLabel>Status</DropdownMenuLabel>
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
                    </div>
                  </td>
                  <td className="py-2 px-4 align-middle truncate">
                    {ticket.lastUpdated}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}