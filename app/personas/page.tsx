"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Layout } from "@/components/layout"
import { Search, Plus, Eye, Edit, Users, MapPin, Phone, Calendar, Filter } from "lucide-react"
import Link from "next/link"

const personasData = [
  {
    id: 1,
    dpi: "2547 89632 0101",
    nombre: "María Elena Morales García",
    edad: 34,
    sexo: "F",
    telefono: "5512-3456",
    codigoFamilia: "FAM-001-2025",
    direccion: "Barrio El Centro, Casa #45",
    territorio: "T1",
    sector: "1A",
    estado: "Activo",
    ultimaVisita: "2025-05-15",
  },
  {
    id: 2,
    dpi: "1876 54321 0101",
    nombre: "Carlos Roberto Pérez López",
    edad: 42,
    sexo: "M",
    telefono: "4423-7890",
    codigoFamilia: "FAM-002-2025",
    direccion: "Colonia San José, 3ra Calle 12-34",
    territorio: "T2",
    sector: "2A",
    estado: "Activo",
    ultimaVisita: "2025-05-12",
  },
  {
    id: 3,
    dpi: "3298 76543 0101",
    nombre: "Ana Lucía Hernández Rodríguez",
    edad: 28,
    sexo: "F",
    telefono: "3345-6789",
    codigoFamilia: "FAM-003-2025",
    direccion: "Zona 4, Avenida Las Flores 8-90",
    territorio: "T1",
    sector: "1B",
    estado: "Activo",
    ultimaVisita: "2025-05-10",
  },
  {
    id: 4,
    dpi: "4567 12345 0101",
    nombre: "José Miguel Castillo Vásquez",
    edad: 67,
    sexo: "M",
    telefono: "2234-5678",
    codigoFamilia: "FAM-004-2025",
    direccion: "Barrio La Esperanza, Casa #78",
    territorio: "T3",
    sector: "3A",
    estado: "Inactivo",
    ultimaVisita: "2025-04-28",
  },
  {
    id: 5,
    dpi: "5432 98765 0101",
    nombre: "Sofía Alejandra Gómez Martínez",
    edad: 19,
    sexo: "F",
    telefono: "6678-9012",
    codigoFamilia: "FAM-005-2025",
    direccion: "Colonia Nueva, 5ta Avenida 15-67",
    territorio: "T2",
    sector: "2B",
    estado: "Activo",
    ultimaVisita: "2025-05-14",
  },
]

export default function PersonasPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [territorioFilter, setTerritorioFilter] = useState("todos")
  const [sectorFilter, setSectorFilter] = useState("todos")
  const [estadoFilter, setEstadoFilter] = useState("todos")

  const filteredPersonas = personasData.filter((persona) => {
    const matchesSearch =
      persona.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      persona.dpi.includes(searchTerm) ||
      persona.codigoFamilia.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesTerritorio = territorioFilter === "todos" || persona.territorio === territorioFilter
    const matchesSector = sectorFilter === "todos" || persona.sector === sectorFilter
    const matchesEstado = estadoFilter === "todos" || persona.estado === estadoFilter

    return matchesSearch && matchesTerritorio && matchesSector && matchesEstado
  })

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-blue-900">Personas & Familias</h1>
            <p className="text-blue-600">Gestión del registro poblacional territorial</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent">
              <Users className="w-4 h-4 mr-2" />
              Gestión Familias
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Nueva Persona
            </Button>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Total Personas</p>
                  <p className="text-2xl font-bold text-blue-900">2,847</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Familias Registradas</p>
                  <p className="text-2xl font-bold text-blue-900">892</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Activos</p>
                  <p className="text-2xl font-bold text-green-600">2,654</p>
                </div>
                <Badge className="bg-green-100 text-green-800">93.2%</Badge>
              </div>
            </CardContent>
          </Card>
          <Card className="border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Pendientes</p>
                  <p className="text-2xl font-bold text-orange-600">193</p>
                </div>
                <Badge className="bg-orange-100 text-orange-800">6.8%</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros y Búsqueda */}
        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="text-lg text-blue-900 flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Filtros de Búsqueda
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-blue-400" />
                <Input
                  placeholder="Buscar por DPI, nombre o código familia..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 border-blue-200 focus:border-blue-500"
                />
              </div>
              <Select value={territorioFilter} onValueChange={setTerritorioFilter}>
                <SelectTrigger className="border-blue-200">
                  <SelectValue placeholder="Territorio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="T1">Territorio 1</SelectItem>
                  <SelectItem value="T2">Territorio 2</SelectItem>
                  <SelectItem value="T3">Territorio 3</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sectorFilter} onValueChange={setSectorFilter}>
                <SelectTrigger className="border-blue-200">
                  <SelectValue placeholder="Sector" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="1A">Sector 1A</SelectItem>
                  <SelectItem value="1B">Sector 1B</SelectItem>
                  <SelectItem value="2A">Sector 2A</SelectItem>
                  <SelectItem value="2B">Sector 2B</SelectItem>
                  <SelectItem value="3A">Sector 3A</SelectItem>
                </SelectContent>
              </Select>
              <Select value={estadoFilter} onValueChange={setEstadoFilter}>
                <SelectTrigger className="border-blue-200">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="Activo">Activo</SelectItem>
                  <SelectItem value="Inactivo">Inactivo</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent">
                Limpiar Filtros
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabla de Personas */}
        <Card className="border-blue-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-blue-900">Registro de Personas</CardTitle>
                <CardDescription>
                  Mostrando {filteredPersonas.length} de {personasData.length} personas
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="border-blue-200 text-blue-700 bg-transparent">
                  Exportar
                </Button>
                <Button variant="outline" size="sm" className="border-blue-200 text-blue-700 bg-transparent">
                  Columnas
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-blue-200">
              <Table>
                <TableHeader>
                  <TableRow className="bg-blue-50">
                    <TableHead className="text-blue-900 font-semibold">DPI</TableHead>
                    <TableHead className="text-blue-900 font-semibold">Nombre Completo</TableHead>
                    <TableHead className="text-blue-900 font-semibold">Edad/Sexo</TableHead>
                    <TableHead className="text-blue-900 font-semibold">Teléfono</TableHead>
                    <TableHead className="text-blue-900 font-semibold">Código Familia</TableHead>
                    <TableHead className="text-blue-900 font-semibold">Ubicación</TableHead>
                    <TableHead className="text-blue-900 font-semibold">Estado</TableHead>
                    <TableHead className="text-blue-900 font-semibold">Última Visita</TableHead>
                    <TableHead className="text-blue-900 font-semibold">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPersonas.map((persona) => (
                    <TableRow key={persona.id} className="hover:bg-blue-50/50">
                      <TableCell className="font-mono text-sm">{persona.dpi}</TableCell>
                      <TableCell className="font-medium">{persona.nombre}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>{persona.edad} años</span>
                          <Badge variant={persona.sexo === "F" ? "secondary" : "outline"} className="text-xs">
                            {persona.sexo}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-blue-600" />
                          <span className="text-sm">{persona.telefono}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Link href={`/familias/${persona.codigoFamilia}`} className="text-blue-600 hover:underline">
                          {persona.codigoFamilia}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-blue-600" />
                            <span className="text-xs">
                              {persona.territorio}-{persona.sector}
                            </span>
                          </div>
                          <div className="text-xs text-gray-600 max-w-32 truncate">{persona.direccion}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={persona.estado === "Activo" ? "default" : "secondary"}
                          className={
                            persona.estado === "Activo" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                          }
                        >
                          {persona.estado}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-blue-600" />
                          <span className="text-sm">{persona.ultimaVisita}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-blue-600 hover:bg-blue-50">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-blue-600 hover:bg-blue-50">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Paginación */}
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-blue-600">Mostrando 1-5 de {filteredPersonas.length} resultados</div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled className="border-blue-200 bg-transparent">
                  Anterior
                </Button>
                <Button variant="outline" size="sm" className="border-blue-200 bg-blue-600 text-white">
                  1
                </Button>
                <Button variant="outline" size="sm" className="border-blue-200 text-blue-700 bg-transparent">
                  2
                </Button>
                <Button variant="outline" size="sm" className="border-blue-200 text-blue-700 bg-transparent">
                  Siguiente
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}
